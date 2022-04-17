import { Link } from "preact-router/match"
import { Icon } from "../../components/icon"
import { Sidebar } from "../../components/sidebar"
<<<<<<< HEAD
import { translate } from "../../components/util"
=======
import constants from "../../constants"
>>>>>>> upstream/develop

const SidebarItem = ({ label, href, path, icon }) => (
  <li class="nav-item">
    <Link href={href} path={path} class="nav-link" activeClassName="active">
      <Icon cls={icon} />
      {label}
    </Link>
  </li>
)

const AdminSidebar = () => {
  return (
    <Sidebar>
      <ul class="nav nav-pills flex-column scrollarea">
<<<<<<< HEAD
        <SidebarItem label={translate("User")} href="/app/admin/user" icon="person-fill" />
        <SidebarItem label={translate("Ore")} href="/app/admin/ore" icon="bucket-fill" />
        <SidebarItem
          label= {translate("Station")}
          href="/app/admin/station"
          icon="geo-fill"
        />
        <SidebarItem
          label= {translate("Method")}
          href="/app/admin/method"
          icon="funnel-fill"
        />
        <SidebarItem
          label={translate("Mining Session")}
          href="/app/admin/mining_session"
=======
        <SidebarItem
          label="User"
          href={constants.BASEURL + "/admin/user"}
          icon="person-fill"
        />
        <SidebarItem
          label="Ore"
          href={constants.BASEURL + "/admin/ore"}
          icon="bucket-fill"
        />
        <SidebarItem
          label="Station"
          href={constants.BASEURL + "/admin/station"}
          icon="geo-fill"
        />
        <SidebarItem
          label="Method"
          href={constants.BASEURL + "/admin/method"}
          icon="funnel-fill"
        />
        <SidebarItem
          label="MiningSession"
          href={constants.BASEURL + "/admin/mining_session"}
>>>>>>> upstream/develop
          icon="people-fill"
        />
      </ul>
    </Sidebar>
  )
}

export default AdminSidebar
