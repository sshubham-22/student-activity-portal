'use client'

import { FieldTemplateProps } from '@rjsf/utils'

export function FieldTemplate(props: FieldTemplateProps) {
  const { id, label, required, errors, children } = props

  return (
    <div className="space-y-1 ">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-neutral-700 "
      >
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>

      {children}

      {errors && (
        <p className="text-xs text-red-500">
          {errors}
        </p>
      )}
    </div>
  )
}

export function SubmitButton() {
  return (
    <button
      type="submit"
      className="w-full bg-neutral-900 text-white py-2.5 rounded-lg font-medium hover:bg-neutral-800 transition cursor-pointer"
    >
      Continue
    </button>
  )
}
