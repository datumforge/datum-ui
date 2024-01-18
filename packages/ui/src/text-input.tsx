'use client'

import * as React from 'react'
import { clsx } from 'clsx'

export const TextInput = React.forwardRef<HTMLInputElement, any>(
	(props, ref) => {



		return (
			<input
				className={clsx(
					`w-full h-10 rounded-md pl-2 ring-blackberry-800 dark:peat-800 focus:outline-0 dark:text-white text-blackberry-800 dark:bg-peat-900 bg-blackberry-50 border border-blackberry-200 dark:border-peat-700`,
					props.invalid ? 'border-red-500' : '', props.className
				)}
				ref={ref}
				type="text"
				onChange={() => { console.log("HELLO") }}
				{...props}
			/>
		)
	},
)

TextInput.displayName = 'TextInput'

export default TextInput
