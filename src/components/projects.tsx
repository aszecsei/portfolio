'use client'

import * as JsSearch from 'js-search'
import { useMemo, useState } from 'react'
import { stem } from 'stemr'
import type { IProject } from '@/models/project'
import { Column, Columns } from './column'
import * as Form from './form'
import { Project } from './project'

interface IProjectsProps {
  projects: IProject[]
}

const numProjectCols = 3
export function splitIntoChunks<T>(arr: T[], chunkSize: number) {
  return arr
    .map((_, i) => (i % chunkSize === 0 ? arr.slice(i, i + chunkSize) : null))
    .filter((e) => e)
}

const MONTHS: Record<string, number> = {
  January: 0,
  February: 1,
  March: 2,
  April: 3,
  May: 4,
  June: 5,
  July: 6,
  August: 7,
  September: 8,
  October: 9,
  November: 10,
  December: 11,
}

function parseProjectDate(dateStr: string): number {
  const [month, year] = dateStr.split(' ')
  return new Date(Number.parseInt(year, 10), MONTHS[month] ?? 0).getTime()
}

function sortProjectsByDate(arr: IProject[]) {
  return [...arr].sort(
    (a, b) => parseProjectDate(b.date) - parseProjectDate(a.date),
  )
}

export function Projects({ projects }: IProjectsProps) {
  const [filter, setFilter] = useState('')

  const search = useMemo(() => {
    const s = new JsSearch.Search('id')
    s.tokenizer = new JsSearch.StemmingTokenizer(
      stem,
      new JsSearch.SimpleTokenizer(),
    )
    s.addIndex('name')
    s.addIndex('summary')
    s.addIndex('description')
    s.addIndex('date')
    s.addIndex('tasks')
    s.addIndex('tags')
    s.addDocuments(projects.map((v, id) => ({ ...v, id })))
    return s
  }, [projects])

  const updateFilter = (e: React.FormEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement
    setFilter(input.value)
  }

  return (
    <>
      <Columns>
        <Column size={4} offsetsize={8}>
          <Form.Field>
            <Form.Control>
              <Form.Input
                placeholder="Search"
                type="text"
                onChange={updateFilter}
                aria-label="Search"
              />
            </Form.Control>
          </Form.Field>
        </Column>
      </Columns>
      {splitIntoChunks(
        filter !== ''
          ? (search.search(filter) as IProject[])
          : sortProjectsByDate(projects),
        numProjectCols,
      ).map((value, index) => (
        <Columns key={value?.[0]?.url ?? index}>
          {value?.map((project) => (
            <Column key={project.url} size={12 / numProjectCols}>
              <Project projectDetails={project} />
            </Column>
          ))}
        </Columns>
      ))}
    </>
  )
}
