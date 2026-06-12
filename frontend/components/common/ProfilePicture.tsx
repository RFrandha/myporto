'use client';

import { motion } from 'framer-motion';
import { colors } from '@/styles/theme';

interface ProfilePictureProps {
  src?: string;
  alt?: string;
  size?: number;
}

export function ProfilePicture({
  src,
  alt = 'Restow Frandha',
  size = 200,
}: ProfilePictureProps): React.ReactElement {
  const hasImage = src && src.length > 0;

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="relative"
      style={{ width: size, height: size }}
    >
      {/* Gradient border */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: colors.accentGradient,
          padding: '3px',
        }}
      >
        <div
          className="w-full h-full rounded-full overflow-hidden flex items-center justify-center"
          style={{ backgroundColor: colors.primary.dark }}
        >
          {hasImage ? (
            <img
              src={src}
              alt={alt}
              className="w-full h-full object-cover"
            />
          ) : (
            /* Placeholder - initials */
            <div
              className="flex items-center justify-center w-full h-full"
              style={{ color: colors.accent.main }}
            >
              <span className="text-5xl font-bold">RF</span>
            </div>
          )}
        </div>
      </div>

      {/* Glow effect */}
      <div
        className="absolute inset-0 rounded-full opacity-30 blur-xl"
        style={{ background: colors.accentGradient }}
      />
    </motion.div>
  );
}
