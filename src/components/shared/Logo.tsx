import { cn } from '@/lib/utils';

type LogoProps = {
  className?: string;
  variant?: 'full' | 'icon';
  alt?: string;
};

export default function Logo({
  className,
  variant = 'full',
  alt = 'Cognisa',
}: LogoProps) {
  const variantClasses =
    variant === 'icon'
      ? 'h-10 w-10 md:h-12 md:w-12 object-cover object-top'
      : 'h-8 md:h-9 w-auto object-contain';

  return (
    <img
      src="/logo-cognisa-transparent.png"
      alt={alt}
      className={cn('select-none', variantClasses, className)}
      draggable={false}
    />
  );
}
