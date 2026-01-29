export default function Loading() {
    return (
      <div className="p-6 space-y-6 animate-pulse">
        <div className="h-8 w-48 bg-neutral-200 rounded" />
  
        <div className="flex flex-col gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-32 bg-neutral-200 rounded-lg"
            />
          ))}
        </div>
      </div>
    )
  }
  