import { Router } from "preact-router"
import { Fragment } from "preact"
import { Link } from "preact-router/match"
import Input from "../../../components/form/input"
import { Icon } from "../../../components/icon"
import constants from "../../../constants"
import MiningSessionParticipants from "./_participants"
import MiningSessionEntries from "./_entries"
import { useAppContext } from "../../../components/app"
import SearchInput from "../../../components/form/searchInput"

const MiningSessionForm = ({ model }) => {
  const { apiConnector } = useAppContext()
  const findUsers = (name) =>
    apiConnector
      .api("GET", `/user/?filter=name:${name||""}&limit=-1&sort=name:asc`)
      .fetch()
      .then((result) => result.json())
      .then((context) => (context.json.items || []).map(
        it => ({ id: it.id, name: it.name })
      ))

  return (
    <Fragment>
      <form class="mb-3" action="javascript:void(0)">
        <Input
          label="Name"
          id="mining-session-name"
          type="text"
          placeholder="mining-session name"
          value={model.name}
          onChange={(e) => this.setState({ name: e.target.value })}
        />
        <SearchInput
          id="mining-session-creator"
          label="Creator"
          value={model.creator}
          searchFn={findUsers}
          viewFn={(it) => `${it.name} (${it.id})`}
        />
        <div class="d-flex justify-content-end">
          <a
            href={`${constants.BASEURL}/admin/mining_session/${model.id}/entry/create`}
            type="button"
            class="flex-grow-0 btn btn-primary"
          >
            Save
          </a>
        </div>
      </form>
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <Link
            href={`${constants.BASEURL}/admin/mining_session/${model.id}/entry`}
            class="nav-link"
            activeClassName="active"
          >
            <Icon cls="list-ul" />
            Entries
          </Link>
        </li>
        <li class="nav-item">
          <Link
            href={`${constants.BASEURL}/admin/mining_session/${model.id}/participant`}
            class="nav-link"
            activeClassName="active"
          >
            <Icon cls="people-fill" />
            Participants
          </Link>
        </li>
        <li class="nav-item">
          <Link
            href={`${constants.BASEURL}/admin/mining_session/${model.id}/payout`}
            class="nav-link"
            activeClassName="active"
          >
            <Icon cls="currency-exchange" />
            Payout Summary
          </Link>
        </li>
      </ul>
      <Router>
        <MiningSessionEntries
          id="tab-mining-session-entries"
          model={model}
          path={`${constants.BASEURL}/admin/mining_session/:modelId/entry`}
        />
        <MiningSessionParticipants
          id="tab-mining-session-participants"
          model={model}
          path={`${constants.BASEURL}/admin/mining_session/:modelId/participant`}
        />
        <div
          id="tab-mining-session-payout-summary"
          path={`${constants.BASEURL}/admin/mining_session/:modelId/payout`}
        ></div>
      </Router>
    </Fragment>
  )
}

export default MiningSessionForm
