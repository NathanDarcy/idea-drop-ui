import { createFileRoute } from '@tanstack/react-router'

async function fetchIdea(ideaId: string) {
  const response = await fetch(`http://localhost:8000/ideas/${ideaId}`)
  if (!response.ok) {
    throw new Error('Failed to fetch')
  }

  return response.json()
}

export const Route = createFileRoute('/ideas/$ideaId/')({
  head: () => ({
    meta: [{ title: 'IdeaHub - Browse Ideas' }],
  }),
  component: IdeaDetailsPage,
  loader: async ({ params }) => {
    return fetchIdea(params.ideaId)
  },
})

function IdeaDetailsPage() {
  const idea = Route.useLoaderData()

  return <div>{idea.title}</div>
}
