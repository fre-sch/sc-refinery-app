import { Router } from 'preact-router'
import Sidebar from "./_sidebar"
import UserIndex from "./userIndex"
import UserEdit from "./userEdit"
import UserCreate from './userCreate'
import StationIndex from "./stationIndex"
import StationEdit from "./stationEdit"
import StationCreate from "./stationCreate"
import Method from "./method"
import MethodEdit from "./methodEdit"
import Ore from "./ore"
import Mining_session from './mining_session'


const Default = (props) => (
  <div class="p-3">Default</div>
)

export default (props) => {
  return (
    <div class="d-flex flex-grow-1">
      <Sidebar />
      <Router>
        <Default path="/app/admin" />

        <UserIndex path="/app/admin/user" />
        <UserEdit path="/app/admin/user/:modelId" />
        <UserCreate path="/app/admin/user/create" />

        <StationIndex path="/app/admin/station" />
        <StationEdit path="/app/admin/station/:modelId" />
        <StationCreate path="/app/admin/station/create" />

        <Method path="/app/admin/method" />
        <MethodEdit path="/app/admin/method/:modelId" />

        <Ore path="/app/admin/ore" />

        <Mining_session path="/app/admin/mining_session" />
      </Router>
    </div>
  )
}
