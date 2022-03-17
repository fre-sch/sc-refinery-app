import { debounceEffect } from "../../../components/util"
import AdminDataTable from "../_table"
import useQueryState from "../_query"
import Breadcrumb from "../../../components/breadcrumb"
import { useAppContext } from "../../../components/app"

const columns = [
  {
    header: {
      title: "id",
    },
    body: {
      value: "id",
    },
    sortable: "id",
    width: 0.5,
  },
  {
    header: {
      title: "name",
    },
    body: {
      value: "name",
    },
    filterable: "name",
    sortable: "name",
    width: 4,
  },
  {
    header: {
      title: "created",
    },
    body: {
      value: "created",
    },
    sortable: "created",
    width: 1,
  },
  {
    header: {
      title: "updated",
    },
    body: {
      value: "updated",
    },
    sortable: "updated",
    width: 1,
  },
]

export default (props) => {
  const { apiConnector } = useAppContext()
  const [queryState, queryDispatch] = useQueryState()

  debounceEffect(
    () => {
      apiConnector
        .api("GET", "/mining_session/?" + queryState.queryParams)
        .fetch()
        .then((result) => result.json())
        .then((context) => {
          queryDispatch("querySuccess", context.json)
        })
        .catch(() => {})
    },
    [queryState.queryParams],
    300
  )
  console.log(queryState)

  return (
    <div class="m-3 flex-grow-1">
      <Breadcrumb
        items={[
          { label: "Admin", href: "/app/admin" },
          { label: "Mining Session", href: "/app/admin/mining_session" },
        ]}
      />
      <AdminDataTable
        columns={columns}
        queryState={queryState}
        queryDispatch={queryDispatch}
        onRowClicked={(row) => route(`/app/admin/mining_session/${row.id}`)}
      />
    </div>
  )
}
