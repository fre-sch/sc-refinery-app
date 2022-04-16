import { Link } from "preact-router/match"
import { Icon } from "../../components/icon"
import { Sidebar } from "../../components/sidebar"
import constants from "../../constants"

const SidebarItem = ({ label, href, icon }) => (
  <li class="nav-item">
    <Link href={href} class="nav-link" activeClassName="active">
      <Icon cls={icon} />
      {label}
    </Link>
  </li>
)

const HomeSidebar = () => {
  return (
    <Sidebar>
      <ul class="nav nav-pills flex-column scrollarea">
        <SidebarItem
          label="Friends"
          href={constants.BASEURL + "/home/friends"}
          icon="person-fill"
        />
        <SidebarItem
          label="Mining Session"
          href={constants.BASEURL + "/home/mining_session_user"}
          icon="bucket-fill"
        />
        <SidebarItem
          label="Outstanding Payments"
          href={constants.BASEURL + "/home/Outstanding_Payments/"}
          icon="bucket-fill"
        />
        <SidebarItem
          label="Settings"
          href={constants.BASEURL + "/home/settings"}
          icon="bucket-fill"
        />
      </ul>
    </Sidebar>
  )
}

export default HomeSidebar
