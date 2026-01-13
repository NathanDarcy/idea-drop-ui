import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/ideas')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <Outlet />
    </div>
  )
}
