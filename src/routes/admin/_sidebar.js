import { Link } from "preact-router/match"
import { Icon } from "../../components/icon"
import { Sidebar } from "../../components/sidebar"

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
        <SidebarItem label="User" href="/app/admin/user" icon="person-fill" />
        <SidebarItem label="Ore" href="/app/admin/ore" icon="bucket-fill" />
        <SidebarItem
          label="Station"
          href="/app/admin/station"
          icon="geo-fill"
        />
        <SidebarItem
          label="Method"
          href="/app/admin/method"
          icon="funnel-fill"
        />
        <SidebarItem
          label="MiningSession"
          href="/app/admin/mining_session"
          icon="people-fill"
        />
      </ul>
    </Sidebar>
  )
}
