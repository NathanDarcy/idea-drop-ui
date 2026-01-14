import api from '@/lib/axios'
import type { Idea } from '@/types'

export async function fetchIdeas(): Promise<Idea[]> {
  const response = await api.get('/ideas')
  return response.data
}

export async function fetchIdea(ideaId: string): Promise<Idea> {
  const response = await api.get(`/ideas/${ideaId}`)
  return response.data
}
