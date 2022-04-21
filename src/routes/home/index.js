import { Router } from 'preact-router'
import constants from "../../constants"
import  Sidebar  from "./_sidebar"
import Mining_Session_User from "./mining_session_user"
import Friends from "./friends"
import Outstanding_Payment from "./Outstanding_Payments"
import Settings from "./settings"

const Default = () => (
  <div class="p-3">Welcome</div>
)

const HomeIndex = () => {
  return (
    <div class="d-flex flex-grow-1">
      <Sidebar />
      <Router>
        <Default path={constants.BASEURL + "/home"} />

        <Friends path={constants.BASEURL + "/home/friends"} />
        <Outstanding_Payment path={constants.BASEURL + "/home/outstanding_payments"} />
        <Mining_Session_User path={constants.BASEURL + "/home/mining_session_user"} />
        <Settings path={constants.BASEURL + "/home/settings"} />
      
      </Router>
    </div>
  )
}
export default HomeIndex