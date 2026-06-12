'use client';

import { useState } from 'react';
import { Button } from '@/components/common/Button';
import { colors } from '@/styles/theme';
import { apiClient } from '@/lib/api';
import type { ContactFormData } from '@/lib/types';

/**
 * Contact form with name, email, message + submit button
 */
export function ContactForm(): React.ReactElement {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus('idle');

    try {
      const response = await apiClient.submitContact(formData);

      if (response.code === 'SUCCESS') {
        setStatus('success');
        setMessage('Message sent successfully! I\'ll get back to you soon.');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
        setMessage(response.message || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium mb-2"
          style={{ color: colors.accent.gold }}
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2"
          style={{
            backgroundColor: colors.primary.lightNavy,
            borderColor: colors.accent.gold,
            color: colors.neutral.white,
          }}
          placeholder="Your name"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium mb-2"
          style={{ color: colors.accent.gold }}
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2"
          style={{
            backgroundColor: colors.primary.lightNavy,
            borderColor: colors.accent.gold,
            color: colors.neutral.white,
          }}
          placeholder="your.email@example.com"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium mb-2"
          style={{ color: colors.accent.gold }}
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
          className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 resize-none"
          style={{
            backgroundColor: colors.primary.lightNavy,
            borderColor: colors.accent.gold,
            color: colors.neutral.white,
          }}
          placeholder="Your message..."
        />
      </div>

      {status !== 'idle' && (
        <div
          className="p-4 rounded-lg"
          style={{
            backgroundColor:
              status === 'success'
                ? colors.status.success
                : colors.status.error,
            color: colors.neutral.white,
          }}
        >
          {message}
        </div>
      )}

      <Button
        type="submit"
        disabled={loading}
        className="w-full"
      >
        {loading ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  );
}
