export default ({ fullHeight=false, isReady, children }) => (
  (isReady)
  ? children
  : (
    <div class="d-flex justify-content-center align-items-center"
      style={fullHeight?"height:100vh":""}>
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  )
)
