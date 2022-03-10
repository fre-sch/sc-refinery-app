import { h, Component, Fragment } from "preact"
import Ace from "../../components/ace"
import Breadcrumb from "../../components/breadcrumb"
import Sidebar from "./sidebar"

const newCollection = (scope) => {
  return {
    scope,
    name: "",
    description: "",
    type: "object",
    properties: {
    },
    indexes: [],
    autoIndex: true
  }
}

export default class CreateCollection extends Component {
  constructor () {
    super()
    this.state = {
      entity: {}
    }
  }

  // componentDidMount () {
  //   const { apiConnector, scope, entityType, entityId } = this.props
  //   apiConnector
  //     .eva("GET", `/${scope}/${entityType}/${entityId}`)
  //     .fetch()
  //     .then(result => result.json())
  //     .then(result => {
  //       this.setState({
  //         entity: result.json
  //       })
  //     })
  // }

  render ({ apiConnector, scopes, scope, entityType, collectionsAvailable }) {
    return <div class="d-flex">
      <Sidebar
        apiConnector={apiConnector}
        scopes={scopes}
        scope={scope}
        entityType={entityType}
        collectionsAvailable={collectionsAvailable}
      />
      <div class="container-fluid p-3">
        <Breadcrumb items={[
          { href: "/eva", label: "EVA" },
          { href: `/eva/${scope}`, label: scope },
          { href: `/eva/${scope}/_new`, label: "Create collection" },
        ]}/>
        <Ace content={JSON.stringify(newCollection(scope), null, 4)} height="80vh" />
      </div>
    </div>
  }
}
