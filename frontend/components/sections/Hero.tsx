'use client';

import { motion } from 'framer-motion';
import { colors } from '@/styles/theme';
import { Button } from '@/components/common/Button';
import { ProfilePicture } from '@/components/common/ProfilePicture';
import { Typewriter } from '@/components/common/Typewriter';

const typewriterWords = [
  'Software Engineer',
  'Backend Specialist',
  'Microservices Architect',
  'Go & Java Developer',
  'API Designer',
];

export function Hero(): React.ReactElement {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      style={{ background: colors.gradient }}
    >
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 blur-3xl"
        style={{ background: colors.accent.main }}
      />

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 relative z-10">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <ProfilePicture src="https://photos.rever.cyou/pub-img/profile-restow.jpg"/>
        </motion.div>

        <div className="text-center md:text-left space-y-6">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <p className="text-lg font-medium mb-2" style={{ color: colors.accent.main }}>
              Hello, I&apos;m
            </p>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight" style={{ color: colors.neutral.white }}>
              Restow Frandha
            </h1>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-2xl md:text-3xl font-semibold"
          >
            <Typewriter words={typewriterWords} />
          </motion.div>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="text-base md:text-lg max-w-xl leading-relaxed"
            style={{ color: colors.neutral.lightGray }}
          >
            Building scalable, robust systems with 6+ years of experience
            in Go, Java, and modern distributed systems.
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.0 }}
            className="flex gap-4 justify-center md:justify-start flex-wrap pt-4"
          >
            <a href="/#projects"><Button>View My Work</Button></a>
            <a href="/#contact"><Button variant="outline">Get In Touch</Button></a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
