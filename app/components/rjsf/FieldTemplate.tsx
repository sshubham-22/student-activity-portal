import { FieldTemplateProps } from '@rjsf/utils'

export function FieldTemplate({
  label,
  required,
  children,
  errors,
}: FieldTemplateProps) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-neutral-700">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      {children}
      {errors}
    </div>
  )
}
