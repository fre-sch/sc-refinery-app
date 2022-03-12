import Breadcrumb from "../../components/breadcrumb"
import { useAppContext } from "../../components/app"
import UserForm from "./_userForm"

export default (props) => {
  const { apiConnector } = useAppContext()
  const newUser = {
    id: "",
    mail: "",
    password: "",
    password_confirm: "",
    is_active: true,
    scopes: [],
  }

  const createUser = (data) => {
    apiConnector
      .api("POST", "/user/")
      .json(data)
      .fetch()
      .then((result) => result.json())
      .then((context) => {
        route(`/app/admin/user/${context.json.id}`)
      })
      .catch(() => {})
  }

  return (
    <div class="m-3 flex-grow-1">
      <Breadcrumb
        items={[
          { label: "Admin", href: "/app/admin" },
          { label: "User", href: "/app/admin/user" },
          { label: "Create" },
        ]}
      />
      <UserForm user={newUser} onSave={createUser} />
    </div>
  )
}
