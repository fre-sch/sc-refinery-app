import classnames from "classnames/dedupe"

export default ({ id, items, selected, onSelect, css }) => (
  <div class={classnames("mb-3", css?.main)}>
    <select
      class={classnames("form-select", css?.select)}
      id={id}
      onChange={(e) => onSelect(parseInt(e.target.value))}
    >
      {items.map(([optValue, optLabel]) => (
        <option value={optValue} selected={selected === optValue}>
          {optLabel}
        </option>
      ))}
    </select>
  </div>
)
