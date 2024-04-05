import { type ReactNode, type ButtonHTMLAttributes } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

export const buttonStyles = tv({
  slots: {
    base: 'group font-mono text-white inline-flex items-center gap-2 justify-center whitespace-nowrap rounded-md leading-none text-sm transition-opacity duration-500 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blackberry-300 disabled:pointer-events-none disabled:opacity-50',
    iconOuter: 'relative h-4 w-4 overflow-hidden',
    iconInner: 'absolute transition-all duration-500',
  },
  variants: {
    variant: {
      sunglow: '!bg-sunglow-900 hover:!opacity-90',
      blackberry: '!bg-blackberry-900 hover:!opacity-90',
      outline:
        'text-blackberry-900 border-blackberry-900 border hover:!opacity-90',
      white: {},
    },
    iconPosition: {
      left: 'flex-row-reverse',
    },
    iconAnimated: {
      true: {
        iconInner: 'group-hover:-translate-y-4',
      },
    },
    size: {
      sm: 'h-auto rounded-none p-0 !bg-transparent font-sans text-lg',
      md: 'h-12 rounded-md text-base px-5',
      lg: 'h-16 px-8 text-lg',
    },
  },
  compoundVariants: [
    {
      variant: 'sunglow',
      size: 'sm',
      class: 'text-sunglow-900',
    },
    {
      variant: 'blackberry',
      size: 'sm',
      class: 'text-blackberry-900',
    },
    {
      variant: 'white',
      size: 'sm',
      class: 'text-white',
    },
  ],
  defaultVariants: {
    variant: 'sunglow',
    size: 'lg',
  },
})

//TODO: Important is needed here for backgrounds due to https://github.com/tailwindlabs/tailwindcss/issues/12734

type ButtonVariants = VariantProps<typeof buttonStyles>

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonVariants {
  asChild?: boolean
  icon?: ReactNode
}
