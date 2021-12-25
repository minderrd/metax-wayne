/**
 * Auth load middleware
 * @param {*} param0
 */
export default function({ store }) {
  if (process.client) {
    store.dispatch('auth/load')
  }
}
