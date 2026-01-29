import { Grade } from '../../types/grade'

interface Props {
  grades: Grade[]
}

export function GradeTable({ grades }: Props) {
  return (
    <div className="overflow-hidden rounded-lg border bg-white">
      <table className="w-full border-collapse">
        <thead className="bg-neutral-50">
          <tr className="text-left text-sm text-neutral-600">
            <th className="px-4 py-3">Course</th>
            <th className="px-4 py-3">Credits</th>
            <th className="px-4 py-3">Grade</th>
            <th className="px-4 py-3">Semester</th>
          </tr>
        </thead>

        <tbody>
          {grades.map(grade => (
            <tr
              key={grade.id}
              className="border-t text-sm"
            >
              <td className="px-4 py-3">
                <div className="font-medium">
                  {grade.courseTitle}
                </div>
                <div className="text-neutral-500 text-xs">
                  {grade.courseCode}
                </div>
              </td>
              <td className="px-9 py-3">
                {grade.credits}
              </td>
              <td className="px-6 py-3">
                <GradeBadge grade={grade.grade} />
              </td>
              <td className="px-4 py-3">
                {grade.semester}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function GradeBadge({ grade }: { grade: Grade['grade'] }) {
  const styles: Record<string, string> = {
    A: 'bg-green-100 text-green-700',
    'A-': 'bg-green-100 text-green-700',
    'B+': 'bg-blue-100 text-blue-700',
    B: 'bg-blue-100 text-blue-700',
    'B-': 'bg-yellow-100 text-yellow-700',
    C: 'bg-orange-100 text-orange-700',
    D: 'bg-red-100 text-red-700',
    F: 'bg-red-200 text-red-800',
  }

  return (
    <span
      className={`px-2 py-1 rounded text-xs font-medium ${styles[grade]}`}
    >
      {grade}
    </span>
  )
}
