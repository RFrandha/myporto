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
  size = 280,
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
      <div
        className="w-full h-full rounded-full overflow-hidden flex items-center justify-center"
        style={{
          backgroundColor: colors.primary.dark,
          border: `3px solid ${colors.accent.main}`,
          boxShadow: `0 0 20px ${colors.accent.main}33`,
        }}
      >
        {hasImage ? (
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover"
          />
        ) : (
          <div
            className="flex items-center justify-center w-full h-full"
            style={{ color: colors.accent.main }}
          >
            <span className="text-5xl font-bold">RF</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
