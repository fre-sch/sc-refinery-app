import Breadcrumb from "../../../components/breadcrumb"
import { useAppContext } from "../../../components/app"
import UserForm from "./_form"

export default (props) => {
  const { apiConnector } = useAppContext()
  const model = {
    id: "",
    mail: "",
    password: "",
    password_confirm: "",
    is_active: true,
    scopes: [],
  }

  const createModel = (data) => {
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
      <UserForm model={model} onSave={createModel} />
    </div>
  )
}
