import { Router } from 'preact-router'
import Sidebar from "./_sidebar"
import UserIndex from "./user/index"
import UserEdit from "./user/edit"
import UserCreate from './user/create'
import StationIndex from "./station/index"
import StationEdit from "./station/edit"
import StationCreate from "./station/create"
import MethodIndex from "./method/index"
import MethodEdit from "./method/edit"
import MethodCreate from "./method/create"
import OreIndex from "./ore/index"
import OreEdit from "./ore/edit"
import OreCreate from "./ore/create"
import Mining_session from './mining_session/index'


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

        <MethodIndex path="/app/admin/method" />
        <MethodEdit path="/app/admin/method/:modelId" />
        <MethodCreate path="/app/admin/method/create" />

        <OreIndex path="/app/admin/ore" />
        <OreEdit path="/app/admin/ore/:modelId" />
        <OreCreate path="/app/admin/ore/create" />

        <Mining_session path="/app/admin/mining_session" />
      </Router>
    </div>
  )
}
