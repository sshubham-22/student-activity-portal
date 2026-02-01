'use client'

export default function CurrentDate() {
  const now = new Date()

  const formatted = now.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return( 
    <span className="text-sm text-white">
      {formatted}
    </span>
  )
};