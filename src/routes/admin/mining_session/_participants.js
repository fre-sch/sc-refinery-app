const MiningSessionParticipants = ({model}) => {
  return (
    <pre>{ JSON.stringify(model.users_invited, null, 2) }</pre>
  )
}

export default MiningSessionParticipants
