import { CELL_SIZE } from '~/helpers/const'

export function toCellPx(number: number) {
  return number * CELL_SIZE + 'px'
}
