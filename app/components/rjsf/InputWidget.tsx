'use client'

import { WidgetProps } from '@rjsf/utils'

export default function InputWidget(props: WidgetProps) {
  const {
    value,
    onChange,
    placeholder,
    disabled,
    readonly,
  } = props

  return (
    <input
      type="text"
      value={value ?? ''}
      placeholder={placeholder}
      disabled={disabled || readonly}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg border border-neutral-300 px-3 py-2
                 focus:outline-none focus:ring-2 focus:ring-neutral-900"
    />
  )
}
