import {
  queryOptions,
  useMutation,
  useSuspenseQuery,
} from '@tanstack/react-query'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { fetchIdea, deleteIdea } from '@/api/ideas'

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

  const navigate = useNavigate()

  const { mutateAsync: deleteMutate, isPending } = useMutation({
    mutationFn: () => deleteIdea(ideaId),
    onSuccess: () => {
      navigate({ to: '/ideas' })
    },
  })

  async function handleDelete() {
    const confirmedDelete = window.confirm('Are you sure?')

    if (!confirmedDelete) {
      return
    }

    await deleteMutate()
  }

  return (
    <div className="p-4">
      <Link to="/ideas" className="text-blue-500 underline block mb-4">
        Back to Ideas
      </Link>

      <h2 className="text-2xl font-bold">{idea.title}</h2>
      <p className="mt-2">{idea.description}</p>

      <button
        onClick={handleDelete}
        disabled={isPending}
        className="text-sm bg-red-600 hover:bg-red-700 
                   text-white mt-4 px-4 py-2 rounded 
                   transition disabled:opacity:50"
      >
        {isPending ? 'Deleting...' : 'Delete'}
      </button>
    </div>
  )
}
