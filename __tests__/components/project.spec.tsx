// tslint:disable-next-line:no-implicit-dependencies
import { splitIntoChunks } from '@/components/project'

describe('split into chunks', () => {
  test('it works with no elements', () => {
    const arr = []
    const result = splitIntoChunks(arr, 4)
    expect(result).toEqual([])
  })

  test('it works with a full array', () => {
    const arr = [1, 2, 3, 4, 5, 6]
    const result = splitIntoChunks(arr, 3)
    expect(result).toEqual([[1, 2, 3], [4, 5, 6]])
  })

  test('it works with a partial array', () => {
    const arr = [1, 2, 3]
    const result = splitIntoChunks(arr, 4)
    expect(result).toEqual([[1, 2, 3]])
  })
})