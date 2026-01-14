import type { Idea } from '@/types'
import { Link } from '@tanstack/react-router'
import clsx from 'clsx'

type IdeaCardProps = {
  idea: Idea
  useButton: boolean
}

export default function IdeaCard({ idea, useButton = true }: IdeaCardProps) {
  const linkClasses = clsx({
    'text-blue-600 hover:underline mt-3': !useButton,
    'text-center mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700':
      useButton,
  })

  return (
    <div className="border border-gray-300 rounded-lg shadow p-4 bg-white">
      <h3 className="text-lg font-bold text-gray-900">{idea.title}</h3>
      <p className="text-gray-600 mb-2">{idea.summary}</p>
      <Link
        to="/ideas/$ideaId"
        params={{ ideaId: idea.id.toString() }}
        className={linkClasses}
      >
        {useButton ? 'View Idea' : 'Read more →'}
      </Link>
    </div>
  )
}
