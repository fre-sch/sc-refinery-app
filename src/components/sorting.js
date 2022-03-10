import { useReducer } from "preact/hooks"
import { IconSort } from "./icon"

export const nextSortValue = (current) => {
  if (current === true ) return false
  else if (current === false) return null
  return true
}

export const sortableReducer = (state, action) => {
  // state = { key1: true|false, key2: true|false }
  // dispatch({ sort: key2 })
  const { sort } = action
  return {
    ...state,
    [sort]: nextSortValue(state[sort])
  }
}

export const useSortState = () => useReducer(sortableReducer, {})

export const SortingTableHeader = ({ onClick, title, value, children }) => (
  <th class="sorting-header">
    <div onClick={onClick}>{title}&nbsp;<IconSort value={value} /></div>
    {children}
  </th>
)
