import { useState } from "preact/hooks"
import isEmpty from "lodash/isEmpty"


export const LoginForm = ({ onCredentialsReady }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  return <form onSubmit={() => onCredentialsReady({username, password})} action="javascript:">
    <div class="mb-3">
      <label for="username" class="form-label text-center">Email address</label>
      <input type="text" class="form-control" id="username"
             placeholder="user@mail"
             value={username}
             onInput={e => setUsername(e.target.value)}
      />
    </div>
    <div class="mb-3">
      <label for="password" class="form-label">Password</label>
      <input type="password" class="form-control" id="password"
             value={password}
             onInput={e => setPassword(e.target.value)}
      />
    </div>
    <button type="submit" class="btn btn-primary"
            disabled={isEmpty(username) || isEmpty(password)}
    >Login
    </button>
  </form>
}
