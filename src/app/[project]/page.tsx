import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ProjectPage } from '@/components/project-page'
import { games, otherProjects } from '@/models/project'

const allProjects = [...games, ...otherProjects]

interface Props {
  params: Promise<{ project: string }>
}

export async function generateStaticParams() {
  return allProjects.map((p) => ({ project: p.url }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { project: slug } = await params
  const project = allProjects.find((p) => p.url === slug)
  if (!project) return {}
  return {
    title: `${project.name} | Alic Szecsei`,
  }
}

export default async function ProjectRoute({ params }: Props) {
  const { project: slug } = await params
  const project = allProjects.find((p) => p.url === slug)
  if (!project) notFound()
  return <ProjectPage project={project} />
}
