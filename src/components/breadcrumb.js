import classnames from "classnames/dedupe"

/*
item = {
  href,
  label,
}
 */
export default ({ items }) => (
  <nav class="flex-grow-1" aria-label="breadcrumb">
    <ol class="breadcrumb border rounded bg-light p-1 ps-2 pe-2">
      {items.map((it, idx) =>(
        <li class={classnames("breadcrumb-item", {
          active: (idx === items.length - 1)
        })}>
          <a href={it.href}>{it.label}</a></li>
      ))}
    </ol>
  </nav>
)
