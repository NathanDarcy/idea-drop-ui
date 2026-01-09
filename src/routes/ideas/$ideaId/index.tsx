import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/ideas/$ideaId/')({
  head: () => ({
    meta: [{ title: 'IdeaHub - Browse Ideas' }],
  }),
  component: IdeaDetailsPage,
})

function IdeaDetailsPage() {
  return <div>Hello "/ideas/$ideaId/"!</div>
}
