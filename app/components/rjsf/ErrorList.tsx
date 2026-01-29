import { ErrorListProps } from '@rjsf/utils'

export function ErrorList({ errors }: ErrorListProps) {
  if (!errors.length) return null

  return (
    <ul className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
      {errors.map((error, i) => (
        <li key={i}>{error.stack}</li>
      ))}
    </ul>
  )
}
