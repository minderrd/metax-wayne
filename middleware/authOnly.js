/**
 * Logged in user only
 * Redirect to landing page if user not log in
 * @param {*} param0
 */
export default function({ store, redirect }) {
  if (process.client && !store.state.auth.isAuthenticated) {
    redirect('/')
  }
}
