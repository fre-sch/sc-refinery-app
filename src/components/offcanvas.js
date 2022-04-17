import classnames from "classnames/dedupe"
<<<<<<< HEAD
import { stopEvent, translate } from './util'
=======
import { stopEvent } from '../util'
>>>>>>> upstream/develop

const OffCanvas = ({ onClose, show, position, children }) => (
  <div class={classnames("offcanvas", `offcanvas-${position}`, {show})}
       style="visibility:visible">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title">{translate("Notifications")}</h5>
      <button type="button" class="btn-close text-reset"
              onClick={stopEvent(onClose)}
      />
    </div>
    <div class="offcanvas-body">{children}</div>
  </div>
)

export default OffCanvas
