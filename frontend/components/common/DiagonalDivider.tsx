'use client';

import { colors } from '@/styles/theme';

interface DiagonalDividerProps {
  direction?: 'down' | 'up';
  color?: string;
  height?: number;
}

export function DiagonalDivider({
  direction = 'down',
  color = colors.primary.dark,
  height = 80,
}: DiagonalDividerProps): React.ReactElement {
  const isDown = direction === 'down';

  return (
    <div
      className="w-full relative"
      style={{
        height: `${height}px`,
        marginTop: isDown ? `-${height / 2}px` : '0',
        marginBottom: isDown ? '0' : `-${height / 2}px`,
        zIndex: 1,
      }}
    >
      <svg
        viewBox={`0 0 1440 ${height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        preserveAspectRatio="none"
        style={{
          transform: isDown ? 'none' : 'rotate(180deg)',
        }}
      >
        <path
          d={`M0,${height * 0.4} L720,${height} L1440,${height * 0.4} L1440,${height} L0,${height} Z`}
          fill={color}
        />
      </svg>
    </div>
  );
}
