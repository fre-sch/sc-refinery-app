import dayjs from "dayjs"
import isNil from "lodash/isNil"

const dateRelative = ({ value }) => (
  <span
    class="date-relative"
    title={value}>{
      isNil(value) ? "" : dayjs(value).fromNow()
    }</span>
)

export default dateRelative
