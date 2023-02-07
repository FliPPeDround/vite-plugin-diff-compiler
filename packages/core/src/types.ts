import type { FilterPattern } from 'vite'

export interface Options {
  include?: FilterPattern
  exclude?: FilterPattern
}

export type CodeInfo = {
  start: number
  end: number
}[]
