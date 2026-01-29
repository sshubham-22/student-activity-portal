'use client'

import { WidgetProps } from '@rjsf/utils'
import { useState } from 'react'

export default function PasswordInputWidget(props: WidgetProps) {
  const {
    value,
    onChange,
    placeholder,
    disabled,
    readonly,
  } = props

  const [show, setShow] = useState(false)

  return (
    <div className="relative">
      <input
        type={show ? 'text' : 'password'}
        value={value ?? ''}
        placeholder={placeholder}
        disabled={disabled || readonly}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-neutral-300 px-3 py-2 pr-10
                   focus:outline-none focus:ring-2 focus:ring-neutral-900"
      />

      <button
        type="button"
        onClick={() => setShow((v) => !v)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-500"
      >
        {show ? 'Hide' : 'Show'}
      </button>
    </div>
  )
}
