import { stopEvent } from "../util"

const ValidationFeedback = ({ hasValidation, isValid, message }) => {
  if (hasValidation)
    if (isValid)
      return <div class="valid-feedback">{message}</div>
    else
      return <div class="invalid-feedback">{message}</div>
}

export default ({ id, label, value, required, onChange, hasValidation, isValid, validationMessage }) => {
  return (
    <div class="mb-3">
      <label for={id} class="form-label">{label}</label>
      <input
        type="text"
        class="form-control"
        id={id}
        value={value}
        required={required}
        onInput={stopEvent(ev => onChange(ev.target.value))}

      />
      <ValidationFeedback
        hasValidation={hasValidation}
        isValid={isValid}
        message={validationMessage}
      />
    </div>
  )
}
