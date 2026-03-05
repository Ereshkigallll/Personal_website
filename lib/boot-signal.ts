/**
 * Lightweight pub/sub to coordinate boot screen → page animation sequencing.
 * Module-level singleton (client-only). Safe because Next.js client bundles
 * are per-browser-tab.
 */

let _complete = false
const _queue: Array<() => void> = []

/** Called by BootScreen when it fully finishes (panels done sliding). */
export function signalBootComplete() {
  _complete = true
  _queue.splice(0).forEach(fn => fn())
}

/**
 * Calls `fn` immediately if boot is already done, otherwise queues it.
 * Returns a cancel function that removes the queued callback if unused.
 */
export function waitForBoot(fn: () => void): () => void {
  if (_complete) {
    fn()
    return () => {}
  }
  _queue.push(fn)
  return () => {
    const i = _queue.indexOf(fn)
    if (i !== -1) _queue.splice(i, 1)
  }
}
