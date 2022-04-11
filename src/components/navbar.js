import { Link } from "preact-router/match"
import { stopEvent, translate } from "./util"
import { useAppContext } from "./app"

const NavLink = (props) => (
  <li class="nav-item">
    <Link className="nav-link" activeClassName="active" href={props.href}>
      {props.children}
    </Link>
  </li>
)

export default (props) => {
  const { login, dispatch } = useAppContext()
  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          SC-REFINERY
        </a>
        <button class="navbar-toggler" type="button">
          <span class="navbar-toggler-icon" />
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav flex-grow-1">
            <NavLink href="/">Home</NavLink>
            {login.user?.scopes?.indexOf("*") > -1 && (
              <NavLink href="/app/admin">Admin</NavLink>
            )}
          </ul>
          <ul class="navbar-nav">
            <li class="nav-item">
              <a
                href="#"
                class="nav-link"
                onClick={stopEvent(() => {
                  dispatch({ type: "notificationsToggle" })
                })}
              >
                {translate("Notifications")}
              </a>
            </li>
            <li class="nav-item">
              <a
                href="#"
                class="nav-link"
                onClick={stopEvent(() =>
                  dispatch(
                    login.user !== undefined
                      ? { type: "logout" }
                      : { type: "showModal", modal: "login" }
                  )
                )}
              >
                {login.user !== undefined ? "Logout" : "Login"}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
