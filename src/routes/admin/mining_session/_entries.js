import { route } from "preact-router"
import constants from "../../../constants"
import { formatDuration } from "../../../util"
import DataTable from "../../../components/dataTable"


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
      title: "user",
    },
    body: {
      value: "user.name",
      classnames: "text-ellipsis"
    },
  },
  {
    header: {
      title: "station",
    },
    body: {
      value: "station.name",
    },
  },
  {
    header: {
      title: "ore",
    },
    body: {
      value: "ore.name",
    },
  },
  {
    header: {
      title: "method",
    },
    body: {
      value: "method.name",
    },
  },
  {
    header: {
      title: "quantity",
    },
    body: {
      value: "quantity",
    },
  },
  {
    header: {
      title: "duration",
    },
    body: {
      value: (row) => formatDuration(row.duration),
    },
  },
  {
    header: {
      title: "cost",
    },
    body: {
      value: (row) => Number(row.cost).toFixed(2),
    },
  },
  {
    header: {
      title: "profit",
    },
    body: {
      view: (row) => (
        <td title="quantity * (method.efficiency + station.efficiency_bonus) * ore.sell_price - method.cost">
          {Number(row.profit).toFixed(2)}
        </td>
      )
    },
  },
]

const totalProfit = ({ entries }) => entries.reduce((acc, entry) => acc + entry.profit, 0).toFixed(2)

const MiningSessionEntries = ({ model }) => {
  return (
    <div class="mt-3">
      <div class="text-end">Total profit: <strong>{ totalProfit(model) }</strong></div>
      <DataTable
        columns={columns}
        items={model.entries}
        onRowClicked={(row) =>
          route(`${constants.BASEURL}/admin/mining_session/${model.id}/entry/${row.id}`)
        }
      />
      <div class="d-flex justify-content-end">
        <a
          href={`${constants.BASEURL}/admin/mining_session/${model.id}/entry/create`}
          type="button" class="flex-grow-0 btn btn-primary">Add entry</a>
      </div>
    </div>
  )
}

export default MiningSessionEntries
