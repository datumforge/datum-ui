import { Slot } from '@radix-ui/react-slot'
import { forwardRef } from 'react'
import { buttonStyles, type ButtonProps } from './button.styles'

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild = false, className, icon, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    const { base, iconOuter, iconInner } = buttonStyles(props)
    return (
      <Comp
        className={`button-icon ${base()}${className ? ` ${className}` : ''}`}
        ref={ref}
        {...props}
      >
        {props.children}
        {icon ? (
          <div className={iconOuter()}>
            <div className={iconInner()}>
              {icon}
              {icon}
            </div>
          </div>
        ) : null}
      </Comp>
    )
  },
)

Button.displayName = 'Button'

export { Button, buttonStyles }
