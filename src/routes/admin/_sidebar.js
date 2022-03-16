import { Sidebar, SidebarItem } from '../../components/sidebar'

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
