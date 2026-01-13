import type { Idea } from '@/types'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'

async function fetchIdea(ideaId: string): Promise<Idea> {
  const response = await fetch(`/api/ideas/${ideaId}`)
  if (!response.ok) {
    throw new Error('Failed to fetch')
  }

  return response.json()
}

function ideaQueryOptions(ideaId: string) {
  return queryOptions({
    queryKey: ['idea', ideaId],
    queryFn: () => fetchIdea(ideaId),
  })
}

export const Route = createFileRoute('/ideas/$ideaId/')({
  head: () => ({
    meta: [{ title: 'IdeaHub - Browse Ideas' }],
  }),
  component: IdeaDetailsPage,
  loader: async ({ params, context: { queryClient } }) => {
    return queryClient.ensureQueryData(ideaQueryOptions(params.ideaId))
  },
})

function IdeaDetailsPage() {
  const { ideaId } = Route.useParams()
  const { data: idea } = useSuspenseQuery(ideaQueryOptions(ideaId))

  return (
    <div className="p-4">
      <Link to="/ideas" className="text-blue-500 underline block mb-4">
        Back to Ideas
      </Link>

      <h2 className="text-2xl font-bold">{idea.title}</h2>
      <p className="mt-2">{idea.description}</p>
    </div>
  )
}
