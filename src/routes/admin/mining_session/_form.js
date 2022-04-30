import { useState } from "preact/hooks"
import Input from "../../../components/form/input"
import UserSearchInput from "../_userSearchInput"

const MiningSessionForm = ({ model, onSave, onDelete }) => {
  const [state, setState_] = useState(model)
  const setState = (data) => setState_({ ...state, ...data })
  return (
    <form class="mt-3 mb-3 col-md-6" action="javascript:void(0)">
      <Input
        label="Name"
        id="mining-session-name"
        type="text"
        placeholder="mining-session name"
        value={state.name}
        onChange={(e) => setState({ name: e.target.value })}
      />
      <UserSearchInput
        id="mining-session-creator"
        label="Creator"
        value={state.creator}
        onChange={(creator) => setState({ creator })}
      />
      <Input
        label="Created"
        id="mining-session-created"
        type="text"
        value={state.created}
        disabled={true}
      />
      <Input
        label="Updated"
        id="mining-session-updated"
        type="text"
        value={state.updated}
        disabled={true}
      />
      <div class="text-end">
        {onDelete !== undefined && (
          <button type="button" class="btn btn-danger me-2"
            onClick={() => onDelete(state)}>
            Delete
          </button>
        )}
        {onSave !== undefined && (
          <button type="button" class="btn btn-primary"
            onClick={() => onSave(state)}>
            Save
          </button>)
        }
      </div>
    </form>
  )
}

export default MiningSessionForm
