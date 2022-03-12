import { Router } from 'preact-router'
import Sidebar from "./_sidebar"
import User from "./user"
import UserEdit from "./userEdit"
import UserCreate from './userCreate'
import Station from "./station"
import Method from "./method"
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
        <User path="/app/admin/user" />
        <UserEdit path="/app/admin/user/:userId" />
        <UserCreate path="/app/admin/user/create" />
        <Station path="/app/admin/station" />
        <Method path="/app/admin/method" />
        <Ore path="/app/admin/ore" />
        <Mining_session path="/app/admin/mining_session" />
      </Router>
    </div>
  )
}
