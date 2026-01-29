import { Course } from "@/app/lib/api/courses"

export default function StatusBadge({ status }: { status: Course['status'] }) {
    const styles = {
      active: 'bg-blue-100 text-blue-700',
      archived: 'bg-neutral-100 text-neutral-700',
    }
  
    return (
      <span
        className={`px-2 py-1 rounded text-xs font-medium ${styles[status]}`}
      >
        {status}
      </span>
    )
  }