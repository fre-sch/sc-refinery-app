import { Router } from 'preact-router'
import constants from "../../constants"
import Sidebar from "./_sidebar"
import MiningSession from './mining_session/index'


const Default = () => (
  <div class="p-3">Welcome</div>
)

const homeIndex = () => {
  return (
    <div class="d-flex flex-grow-1">
      <Sidebar />
      <Router>
        <Default path={constants.BASEURL + "/home"} />

        <MiningSession path={constants.BASEURL + "/home/mining_session"} />
      </Router>
    </div>
  )
}

export default homeIndex