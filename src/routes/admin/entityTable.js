import { debounceEffect, filterableToQuery, sortableToQuery } from '../../components/util'
import DataTable from '../../components/dataTable'
import { sortableReducer, SortingTableHeader } from '../../components/sorting'
import { FilteringTableHeader, FilterInput, filterReducer } from '../../components/filtering'
import { useReducer } from 'preact/hooks'
import Breadcrumb from "../../components/breadcrumb"
import Sidebar from "./_sidebar"

const columns = [
  {
    header: {
      title: "id"
    },
    body: {
      value: "_id"
    },
    width: "14em",
    sortable: "_id"
  },
  {
    header: {
      title: "Firstname"
    },
    body: {
      value: "firstname"
    },
    filterable: "firstname",
    sortable: "firstname"
  },
  {
    header: {
      title: "Lastname"
    },
    body: {
      value: "lastname"
    },
    filterable: "lastname",
    sortable: "lastname"
  },
  {
    header: {title: "JSON"},
    body: {
      view: "json"
    }
  }
]


const bodyViewJson = (item) => (
  <td class="border-top">
    <pre class="m-0">{JSON.stringify(item)}</pre>
  </td>
)

const columnViewSelect = (columns, queryState, queryDispatch) => (
  columns.map(column => bodyViewSelect(
      headerViewSelect({ ...column }, queryState, queryDispatch)
    )
  )
)

const bodyViewSelect = (column) => {
  if (column.body.view === "json") {
    column.body= { ...column.body, view: bodyViewJson }
  }
  return column
}

const headerViewSelect = (column, queryState, queryDispatch) => {
  const sortValue = queryState.sort[column.sortable]
  const filterValue = queryState.filter[column.filterable]
  const queryDispatchSort = () => queryDispatch("sort", { sort: column.sortable })
  const queryDispatchFilter = (value) => queryDispatch("filter", { filter: { [column.filterable]: value } })
  if (column.sortable !== undefined && column.filterable !== undefined) {
    column.header.view = () => <SortingTableHeader
      onClick={queryDispatchSort}
      title={column.header.title}
      value={sortValue}>
      <FilterInput onChange={queryDispatchFilter} value={filterValue} />
    </SortingTableHeader>
  }
  else if (column.sortable !== undefined) {
    const sortValue = queryState.sort[column.sortable]
    column.header.view = () => <SortingTableHeader
      onClick={queryDispatchSort}
      title={column.header.title}
      value={sortValue} />
  }
  else if (column.filterable !== undefined) {
    const filterValue = queryState.filter[column.filterable]
    column.header.view = () => <FilteringTableHeader
      onChange={queryDispatchFilter}
      title={column.header.title}
      value={filterValue} />
  }
  return column
}

const handleQueryState = (state, action) => {
  switch (action.type) {
    case "sort":
      return { ...state, sort: sortableReducer(state.sort, action) }
    case "filter":
      return { ...state, filter: filterReducer(state.filter, action) }
    case "querySuccess":
      return {
        ...state,
        items: action.items,
        totalCount: action.totalCount,
        totalPages: Math.ceil(action.totalCount / state.perPage),
        page: 0
      }
  }
  return state
}

const useQueryState = (initState) => {
  const [ state, dispatch ] = useReducer(handleQueryState, initState)
  return [ state, (type, data) => dispatch({type, ...data}) ]
}


const fetchItems = (apiConnector, { sort, filter }, scope, entityType) => (
  apiConnector
    .eva("POST", `/${scope}/${entityType}/_search`)
    .json({
      sort: sortableToQuery(sort),
      query: filterableToQuery(filter)
    })
    .fetch()
    .then(result => result.json())
)


const sidebarItems = (scope, entityType, items) =>
  items.map(it => {
    return {
      icon: "table",
      active: entityType === it.entity_type,
      href: `/eva/${scope}/${it.entity_type}`,
      label: " " + it.entity_type
    }
  })


export default ({ apiConnector, scopes, scope, entityType, collectionsAvailable }) => {
  const [ queryState, queryDispatch ] = useQueryState({
    page: 0,
    perPage: 10,
    sort: {},
    filter: {},
    items: [],
    totalCount: 0,
    totalPages: 0
  })

  debounceEffect(() => {
    fetchItems(apiConnector, queryState, scope, entityType)
      .then(context => {
        queryDispatch("querySuccess", context.json)
      })
      .catch(() => {})
  }, 800, [
    scope,
    entityType,
    queryState.page,
    queryState.perPage,
    queryState.sort,
    queryState.filter
  ])

  return <div class="d-flex flex-grow-1 gap-3">
    <div class="gap-3">
      <Breadcrumb items={[
        { href: "/eva", label: "EVA" },
        { href: `/eva/${scope}`, label: scope },
        { href: `/eva/${scope}/${entityType}`, label: entityType }
      ]}/>
      <div class="border rounded">
        <div className="bg-light p-2 border-bottom">
          table top
        </div>
        <DataTable
          columns={columnViewSelect(columns, queryState, queryDispatch)}
          items={queryState.items}
        />
        <div class="bg-light p-2 border-top">
          table bottom
        </div>
      </div>
    </div>
  </div>
}
