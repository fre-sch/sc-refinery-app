import { Link } from "preact-router/match"
import { Icon } from "../../components/icon"
import { Sidebar } from "../../components/sidebar"
import { translate } from "../../components/util"

const SidebarItem = ({ label, href, icon }) => (
  <li class="nav-item">
    <Link href={href} class="nav-link" activeClassName="active">
      <Icon cls={icon} />
      {label}
    </Link>
  </li>
)

export default (props) => {
  return (
    <Sidebar>
      <ul class="nav nav-pills flex-column scrollarea">
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
          icon="people-fill"
        />
      </ul>
    </Sidebar>
  )
}
