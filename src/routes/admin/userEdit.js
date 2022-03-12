import Breadcrumb from "../../components/breadcrumb"
import Spinner from "../../components/spinner"
import { useEffect, useReducer } from "preact/hooks"
import { useAppContext } from "../../components/app"
import UserForm from "./_userForm"

const handleUserForm = (state, action) => {
  switch (action.type) {
    case "loading": {
      return { ...state, isReady: false }
    }
    case "loadSuccess": {
      return {...state, user: action.user, isReady: true }
    }
    default:
      return state
  }
}

export default ({ userId }) => {
  const { apiConnector } = useAppContext()
  const [state, dispatch] = useReducer(handleUserForm, {
    userId,
    user: null,
    isReady: false
  })

  useEffect(() => {
    if (state.isReady) return;
    apiConnector.api("GET", `/user/${userId}`)
      .fetch()
      .then(result => result.json())
      .then(context => {
        dispatch({ type:"loadSuccess", user: context.json })
      })
      .catch(() => {})
  }, [state.isReady])

  const updateUser = (data) => {
    dispatch({ type: "loading" })
    apiConnector.api("PUT", `/user/${userId}`)
      .json(data)
      .fetch()
      .then(result => result.json())
      .then(context => {
        dispatch({ type: "loadSuccess", user: context.json })
      })
      .catch(() => { })
  }

  return (
    <div class="m-3 flex-grow-1">
      <Breadcrumb
        items={[
          { label: "Admin", href: "/app/admin" },
          { label: "User", href: "/app/admin/user" },
          { label: state.user?.id },
        ]}
      />
      <Spinner isReady={state.isReady}>
        <UserForm
          user={state.user}
          onSave={updateUser}
        />
      </Spinner>
    </div>
  )
}
