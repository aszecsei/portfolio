import { describe, expect, test } from 'vitest'
import type { IProject } from '@/models/project'
import { sortProjectsByDate } from './projects'

const make = (name: string, date: string): IProject => ({
  name,
  date,
  summary: '',
  description: [],
  thumbnail_img_path: '',
  img_path: '',
  link: '',
  url: name,
  type: '',
  software: '',
  language: '',
  role: '',
})

describe('sortProjectsByDate', () => {
  test('orders newest first across years and months', () => {
    const projects = [
      make('a', 'March 2017'),
      make('b', 'January 2018'),
      make('c', 'December 2017'),
    ]
    expect(sortProjectsByDate(projects).map((p) => p.name)).toEqual([
      'b',
      'c',
      'a',
    ])
  })

  test('does not mutate the input', () => {
    const projects = [make('a', 'March 2017'), make('b', 'January 2018')]
    sortProjectsByDate(projects)
    expect(projects.map((p) => p.name)).toEqual(['a', 'b'])
  })
})
