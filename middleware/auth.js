/**
 * Auth load middleware
 * @param {*} param0
 */
export default async function({ store }) {
  if (process.client) {
    await store.dispatch('auth/load')
  }
}
