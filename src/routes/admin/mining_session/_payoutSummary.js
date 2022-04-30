import { Fragment } from "preact"
import { useEffect, useState } from "preact/hooks"
import { useAppContext } from "../../../components/app"

export default ({ model }) => {
  const { apiConnector } = useAppContext();
  const [state, setState] = useState({
    total_profit: 0,
    average_profit: 0,
    items: []
  });

  useEffect(() => {
    apiConnector
      .api()
      .get("mining_session", model.id, "payout_summary")
      .fetch()
      .then(result => result.json())
      .then(context => {
        setState(context.json);
      })
      .catch(() => { })
  }, [model, model.id, model.users_invited, model.entries])

  return (
    <div id="tab-mining-session-payout-summary" class="mt-3 col-md-6">
      <section
        id="payout-summary"
        style="display:grid; grid-template:auto/max-content 1fr; gap:0.3rem"
      >
        <div>Total profit:</div>
        <div class="text-end">{Number(state.total_profit).toFixed(2)}</div>
        <div>Average profit:</div>
        <div class="text-end">{Number(state.average_profit).toFixed(2)}</div>
      </section>
      <section id="payout-users-profit" class="mt-3">
        <h5>User profits</h5>
        <table class="table border">
          <tbody>
            {state.user_profits?.map(item => (
              <tr>
                <td>{item.user_name}</td>
                <td class="text-end">{Number(item.amount).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section id="payout-pending" class="mt-3">
        <h5>Payouts pending</h5>
        {state.payouts?.map((item) => (
          <div key={item.user.id}>
            <h6>{item.user.name}</h6>
            <table class="table border">
              <tbody>
                {item.recipients.map((recipient, idx) => (
                  <tr key={idx}>
                    <td>{recipient.user_name}</td>
                    <td class="text-end">{recipient.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </section>
    </div>
  )
}
