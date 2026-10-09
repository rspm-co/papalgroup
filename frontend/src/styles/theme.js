export const typography = {
  eyebrow:
    'text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--color-gold)]',
  title:
    'text-balance font-bold tracking-normal text-[var(--color-black)]',
  subtitle:
    'text-balance font-medium tracking-normal text-[var(--color-black)]',
  description:
    'text-pretty leading-6 tracking-normal text-[var(--color-gray-600)]',
}

export const containerClasses =
  'mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8'

export const sectionSpacing = {
  none: 'py-0',
  small: 'py-8 sm:py-10 lg:py-12',
  medium: 'py-10 sm:py-12 lg:py-14',
  large: 'py-12 sm:py-14 lg:py-16',
}

export const sectionBackgrounds = {
  default: 'bg-[var(--color-background)]',
  muted: 'bg-[var(--color-gray-50)]',
  glass:
    'bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(250,250,248,0.86))] backdrop-blur-xl',
  dark: 'bg-[var(--color-black)]',
  transparent: 'bg-transparent',
}

export const headingSizes = {
  sm: {
    title: 'text-2xl sm:text-3xl lg:text-4xl',
    subtitle: 'text-base sm:text-lg',
    description: 'text-sm sm:text-base',
  },
  md: {
    title: 'text-3xl sm:text-4xl lg:text-5xl',
    subtitle: 'text-lg sm:text-xl',
    description: 'text-sm sm:text-base',
  },
  lg: {
    title: 'text-4xl sm:text-5xl lg:text-6xl',
    subtitle: 'text-xl sm:text-2xl',
    description: 'text-base sm:text-lg',
  },
}

export const headingAlignment = {
  left: 'items-start text-left',
  center: 'items-center text-center',
  right: 'items-end text-right',
}

export const buttonBaseClasses =
  'inline-flex items-center justify-center gap-2 rounded-[14px] font-medium tracking-normal transition duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-white)] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-55'

export const buttonVariants = {
  primary:
    'border border-[var(--color-gold)] bg-[var(--color-gold)] text-[var(--color-white)] shadow-[0_10px_26px_rgba(187,155,80,0.18)] hover:-translate-y-0.5 hover:border-[var(--color-dark-gold)] hover:bg-[var(--color-dark-gold)] hover:shadow-[0_14px_32px_rgba(187,155,80,0.22)]',
  secondary:
    'border border-[var(--color-gold)] bg-[var(--color-white)] text-[var(--color-gold)] shadow-[0_8px_24px_rgba(26,26,26,0.04)] hover:-translate-y-0.5 hover:bg-[var(--color-gold)] hover:text-[var(--color-white)] hover:shadow-[0_14px_32px_rgba(187,155,80,0.16)]',
  outline:
    'border border-[var(--color-gold)] bg-transparent text-[var(--color-gold)] hover:-translate-y-0.5 hover:bg-[var(--color-gold)] hover:text-[var(--color-white)]',
  ghost:
    'border border-transparent bg-transparent text-[var(--color-black)] hover:bg-[var(--color-gray-100)]',
}

export const buttonSizes = {
  small: 'h-8 px-3 text-xs',
  medium: 'h-10 px-4 text-sm',
  large: 'h-11 px-5 text-sm sm:h-12 sm:px-6',
}

export const cardClasses =
  'rounded-[20px] border border-[var(--color-gray-200)] bg-[var(--color-white)] shadow-[0_14px_42px_rgba(26,26,26,0.06)] backdrop-blur-xl transition-colors duration-300 hover:border-[var(--color-gold)] hover:shadow-[0_18px_52px_rgba(26,26,26,0.08)]'

export const badgeBaseClasses =
  'inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em]'

export const badgeVariants = {
  primary:
    'border border-[var(--color-gold)] bg-[var(--color-gold-soft)] text-[var(--color-black)]',
  secondary:
    'border border-[var(--color-gray-200)] bg-[var(--color-gray-100)] text-[var(--color-gray-700)]',
  outline:
    'border border-[var(--color-gray-300)] bg-transparent text-[var(--color-black)]',
}

export const loaderSizes = {
  small: 'h-4 w-4 border-2',
  medium: 'h-6 w-6 border-2',
  large: 'h-10 w-10 border-[3px]',
}
