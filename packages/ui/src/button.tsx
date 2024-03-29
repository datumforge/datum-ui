'use client'

import * as React from 'react'
import { clsx } from 'clsx'

export const Button = React.forwardRef<HTMLButtonElement, any>((props, ref) => {
	const { className, loading, children, ...rest } = props
	return (
		<button
			{...rest}
			type={rest.type ? rest.type : 'submit'}
			className={clsx(
				`!ui-px-4 !ui-py-3 !ui-bg-sunglow-900 !ui-rounded-md disabled:ui-opacity-25`,
				className,
			)}
			ref={ref}
			disabled={loading}
		>
			{children}
		</button>
	)
})

Button.displayName = 'Button'

export default Button

