import { Fragment } from "preact"
import { stopEvent } from "../../components/util"
import { useState, useEffect } from "preact/hooks"

const resources = [
  "user",
  "user_perm",
  "user_session",
  "station",
  "method",
  "ore",
  "mining_session",
  "mining_session_entry",
]

const actions = ["*", "index", "create", "update", "remove", "read"]

const UserPermsForm = ({ scopes = [], onChange }) => {
  const [state, setState] = useState(scopes)
  const hasStar = state.indexOf("*") > -1

  const toggleScope = (scope) => {
    const idx = state.indexOf(scope)
    if (idx > -1) setState(state.filter((it) => it !== scope))
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

export default ({ user, onSave }) => {
  const [state, setState] = useState({
    user
  })
  const updateUser = (data) => setState({
    ...state,
    user: {...state.user, ...data}
  })

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
            onChange={(e) => updateUser({ mail: e.target.value })}
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
            onChange={(e) => updateUser({ name: e.target.value })}
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
            onChange={(e) => updateUser({ password: e.target.value })}
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
            onChange={(e) => updateUser({ password_confirm: e.target.value })}
          />
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            value={state.is_active}
            id="user-active"
            checked={state.is_active}
            onChange={(e) =>
              updateUser({ is_active: e.target.checked })
            }
          />
          <label class="form-check-label" for="user-active">
            Active
          </label>
        </div>
      </div>
      <UserPermsForm
        scopes={state.scopes}
        onChange={(val) => updateUser({ scopes: val })}
      />
      <div class="d-flex justify-content-between mt-3">
        <button type="submit" class="btn btn-danger">
          Delete
        </button>
        <button
          type="submit"
          class="btn btn-primary"
          onClick={() => onSave(state)}
        >
          Save
        </button>
      </div>
    </Fragment>
  )
}
