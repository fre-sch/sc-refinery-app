import { useEffect, useReducer } from "preact/hooks"
import { useAppContext } from "../../../components/app"
import constants from "../../../constants"
import Breadcrumb from "../../../components/breadcrumb"
import Spinner from "../../../components/spinner"
import MiningSessionForm from "./_form"


const handleForm = (state, action) => {
  switch (action.type) {
    case "loading": {
      return { ...state, isReady: false }
    }
    case "loadSuccess": {
      const { model, ores } = action
      const nextState = { ...state }
      if (model !== undefined) nextState.model = model
      nextState.isReady = nextState.model !== null
      return nextState
    }
    default:
      return state
  }
}

const AdminMiningSessionEdit = ({ modelId }) => {
  const { apiConnector } = useAppContext()
  const [state, dispatch] = useReducer(handleForm, {
    modelId,
    model: null,
    isReady: false,
  })

  useEffect(() => {
    if (state.model !== null) return
    dispatch({ type: "loading" })
    apiConnector
      .api("GET", `/mining_session/${state.modelId}`)
      .fetch()
      .then((result) => result.json())
      .then((context) => {
        dispatch({
          type: "loadSuccess",
          model: context.json,
        })
      })
      .catch(() => {})
  }, [state.model])

  return (
    <div class="m-3 flex-grow-1">
      <Breadcrumb
        items={[
          { label: "Admin", href: constants.BASEURL + "/admin" },
          {
            label: "Mining Session",
            href: constants.BASEURL + "/admin/mining_session",
          },
          { label: state.model?.id },
        ]}
      />
      <Spinner isReady={state.isReady}>
      <MiningSessionForm
        model={state.model}
      />
      </Spinner>
    </div>
  )
}

export default AdminMiningSessionEdit
