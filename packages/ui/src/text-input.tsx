'use client'

import * as React from 'react'
import { clsx } from 'clsx'

export const TextInput = React.forwardRef<HTMLInputElement, any>(
  (props, ref) => {
    return (
      <div className="w-full">
        {props.label ? (
          <label
            className={clsx(
              `block text-sm font-medium  mb-0 text-blackberry-800`,
              props.labelClassName,
            )}
          >
            {props.label}
          </label>
        ) : null}
        <input
          className={clsx(
            `w-full h-10 rounded-md pl-2 ring-blackberry-800 focus:outline-0 
            text-blackberry-800 bg-blackberry-50 border border-blackberry-400 mb-2`,
            props.className,
          )}
          ref={ref}
          type="text"
          required={props.required}
          {...props}
        />
      </div>
    )
  },
)

TextInput.displayName = 'TextInput'

export default TextInput
