import { debounceEffect } from "../../components/util"
import AdminDataTable from "./_table"
import useQueryState from "./_query"
import Breadcrumb from "../../components/breadcrumb"
import Pagination from "../../components/pagination"
import { useAppContext } from "../../components/app"
import { SpinnerOverlay } from "../../components/spinner"

const columns = [
  {
    header: {
      title: "id",
    },
    body: {
      value: "id",
    },
    sortable: "id",
    width: 0.5
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
    width: 4
  },
  {
    header: {
      title: "created",
    },
    body: {
      value: "created",
    },
    sortable: "created",
    width: 1
  },
  {
    header: {
      title: "updated",
    },
    body: {
      value: "updated",
    },
    sortable: "updated",
    width: 1
  },
]

export default (props) => {
  const { apiConnector } = useAppContext()
  const [queryState, queryDispatch] = useQueryState()

  debounceEffect(
    () => {
      queryDispatch("loading", {})
      apiConnector
        .api("GET", "/ore/?" + queryState.queryParams)
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

  return (
    <div class="m-3 flex-grow-1">
      <Breadcrumb
        items={[
          { label: "Admin", href: "/app/admin" },
          { label: "Ore", href: "/app/admin/ore" },
        ]}
      />
      <AdminDataTable
        columns={columns}
        queryState={queryState}
        queryDispatch={queryDispatch}
        onRowClicked={(row) => route(`/app/admin/ore/${row.id}`)}
      >
        <SpinnerOverlay isReady={queryState.status != "loading"}/>
      </AdminDataTable>
      <Pagination
        total={queryState.totalPages}
        current={queryState.page}
        onClick={(page) => queryDispatch("page", { page })}
      />
    </div>
  )
}
