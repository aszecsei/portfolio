'use client'

import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as JsSearch from 'js-search'
import { useMemo, useState } from 'react'
import { stem } from 'stemr'
import type { IProject } from '@/models/project'
import * as Form from './form'
import { Icon } from './icon'
import { Project } from './project'
import * as styles from './projects.css'
import { H2, Text } from './typography'

interface IProjectsProps {
  projects: IProject[]
  title: string
  noun: string
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

export function sortProjectsByDate(arr: IProject[]) {
  return [...arr].sort(
    (a, b) => parseProjectDate(b.date) - parseProjectDate(a.date),
  )
}

export function Projects({ projects, title, noun }: IProjectsProps) {
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

  const query = filter.trim()
  const visible =
    query !== ''
      ? (search.search(query) as IProject[])
      : sortProjectsByDate(projects)

  return (
    <>
      <div className={styles.header}>
        <div className={styles.heading}>
          <H2>{title}</H2>
          <span className={styles.count} aria-hidden="true">
            {projects.length}
          </span>
        </div>
        <Form.Field>
          <div className={styles.search}>
            <Form.Control hasIcon>
              <Form.Input
                placeholder={`Filter ${noun}`}
                type="search"
                value={filter}
                onChange={(e) => setFilter(e.currentTarget.value)}
                aria-label={`Filter ${noun}`}
              />
              <Icon>
                <FontAwesomeIcon icon={faMagnifyingGlass} aria-hidden="true" />
              </Icon>
            </Form.Control>
          </div>
        </Form.Field>
      </div>
      <div aria-live="polite">
        {visible.length === 0 ? (
          <Text className={styles.empty}>
            No {noun} match “{query}”.
          </Text>
        ) : (
          <ul className={styles.grid}>
            {visible.map((project) => (
              <li key={project.url}>
                <Project projectDetails={project} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}
