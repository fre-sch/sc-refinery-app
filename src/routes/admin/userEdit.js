import Breadcrumb from "../../components/breadcrumb"
import Spinner from "../../components/spinner"
import { useState, useEffect, useReducer } from "preact/hooks"
import { Fragment } from "preact"
import { stopEvent } from "../../components/util"
import { useAppContext } from "../../components/app"


const resources = [
  "user", "user_perm", "user_session", "station", "method", "ore",
  "mining_session", "mining_session_entry"
]

const actions = [
  "index", "create", "update", "remove", "read"
]

const UserPermsForm = ({ scopes=[], onChange }) => {
  const [state, setState] = useState(scopes)
  const hasStar = state.indexOf("*") > -1

  const toggleScope = (scope) => {
    const idx = state.indexOf(scope)
    if (idx > -1) setState(state.filter(it => it !== scope))
    else setState([...state, scope])
  }
  useEffect(() => onChange(state), [state])

  return (
    <div class="d-flex justify-content-between">
      <div>
        <strong>Admin</strong>
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            value={state.indexOf("*") > -1}
            id={`user-scope-admin`}
            checked={state.indexOf("*") > -1}
            onChange={stopEvent((_) => toggleScope("*"))}
          />
          <label class="form-check-label" for={`user-scope-admin`}>
            Admin
          </label>
        </div>
      </div>
      {resources.map((resource) => (
        <div>
          <strong>{resource}</strong>
          {actions.map((action) => (
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value={state.indexOf(`${resource}.${action}`) > -1}
                id={`user-scope-${resource}-${action}`}
                checked={state.indexOf(`${resource}.${action}`) > -1}
                onChange={stopEvent((_) =>
                  toggleScope(`${resource}.${action}`)
                )}
                disabled={hasStar}
              />
              <label
                class="form-check-label"
                for={`user-scope-${resource}-${action}`}
              >
                {action}
              </label>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

const UserEditForm = ({ user, onSave }) => {
  const [state, setState_ ] = useState(user)
  const setState = (nextState) => setState_({...state, ...nextState})

  return (
    <Fragment>
      <div>
        <div class="mb-3">
          <label for="user-mail" class="form-label">
            Email address
          </label>
          <input
            type="text"
            class="form-control"
            id="user-mail"
            placeholder="user@mail"
            value={state.mail}
            onChange={(e) => setState({ mail: e.target.value })}
          />
        </div>
        <div class="mb-3">
          <label for="user-name" class="form-label">
            Name
          </label>
          <input
            type="text"
            class="form-control"
            id="user-name"
            value={state.name}
            onChange={(e) => setState({ name: e.target.value })}
          />
        </div>
        <div class="mb-3">
          <label for="user-password" class="form-label">
            Password
          </label>
          <input
            type="password"
            class="form-control"
            id="user-password"
            onChange={(e) => setState({ password: e.target.value })}
          />
        </div>
        <div class="mb-3">
          <label for="user-password-confirm" class="form-label">
            Password (confirm)
          </label>
          <input
            type="password"
            class="form-control"
            id="user-password-confirm"
            onChange={(e) =>
              setState({ passwordConfirm: e.target.value })
            }
          />
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            value={state.is_active}
            id="user-active"
            checked={state.is_active}
            onChange={stopEvent((e) => setState({ is_active: e.target.checked }))}
          />
          <label class="form-check-label" for="user-active">
            Active
          </label>
        </div>
      </div>
      <UserPermsForm scopes={state.scopes} onChange={val => setState({scopes: val})}/>
      <div class="d-flex justify-content-between mt-3">
        <button type="submit" class="btn btn-danger">
          Delete
        </button>
        <button type="submit" class="btn btn-primary" onClick={() => onSave(state)}>
          Save
        </button>
      </div>
    </Fragment>
  )
}

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
          { label: state.userId },
        ]}
      />
      <Spinner isReady={state.isReady}>
        <UserEditForm
          user={state.user}
          onSave={updateUser}
        />
      </Spinner>
    </div>
  )
}
