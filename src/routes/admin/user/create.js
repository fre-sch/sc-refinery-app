import { route } from "preact-router"
import Breadcrumb from "../../../components/breadcrumb"
import { useAppContext } from "../../../components/app"
import UserForm from "./_form"
<<<<<<< HEAD
import { translate } from "../../../components/util"
=======
import constants from "../../../constants"
>>>>>>> upstream/develop

const AdminUserCreate = () => {
  const { apiConnector } = useAppContext()
  const model = {
    id: "",
    mail: "",
    password: "",
    password_confirm: "",
    is_active: true,
    is_google: false,
    scopes: [],
  }

  const createModel = (data) => {
    apiConnector
      .api("POST", "/user/")
      .json(data)
      .fetch()
      .then((result) => result.json())
      .then((context) => {
        route(`${constants.BASEURL}/admin/user/${context.json.id}`)
      })
      .catch(() => {})
  }

  return (
    <div class="m-3 flex-grow-1">
      <Breadcrumb
        items={[
<<<<<<< HEAD
          { label: translate("Admin"), href: "/app/admin" },
          { label: translate("User"), href: "/app/admin/user" },
          { label: translate("Create") },
=======
          { label: "Admin", href: constants.BASEURL + "/admin" },
          { label: "User", href: constants.BASEURL + "/admin/user" },
          { label: "Create" },
>>>>>>> upstream/develop
        ]}
      />
      <UserForm model={model} onSave={createModel} />
    </div>
  )
}

export default AdminUserCreate
