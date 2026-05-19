'use client';

interface IridescentBlobBackgroundProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  opacity?: number;
  className?: string;
}

const sizeMap = {
  sm: 'w-32 h-32',
  md: 'w-48 h-48',
  lg: 'w-64 h-64',
  xl: 'w-80 h-80',
};

export default function IridescentBlobBackground({
  size = 'lg',
  opacity = 0.5,
  className = '',
}: IridescentBlobBackgroundProps) {
  return (
    <div
      className={`${sizeMap[size]} iridescent-blob absolute pointer-events-none ${className}`}
      style={{ opacity, filter: `blur(4px) opacity(${opacity})` }}
    />
  );
}
