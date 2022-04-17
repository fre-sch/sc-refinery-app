import { Router } from 'preact-router'
import constants from "../../constants"
import UserFriends from './friends'
import  Sidebar  from "./_sidebar"
import Mining_Session_User from "./mining_session_user"

const Default = () => (
  <div class="p-3">Welcome</div>
)

const HomeIndex = () => {
  return (
    <div class="d-flex flex-grow-1">
      <Sidebar />
      <Router>
        <Default path={constants.BASEURL + "/home"} />

        <UserFriends path={constants.BASEURL + "/home/friends"} />

        <Mining_Session_User path={constants.BASEURL + "/home/mining_session_user"} />


  

      </Router>
    </div>
  )
}

export default HomeIndex