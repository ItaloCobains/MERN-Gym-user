import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

const Logout = React.lazy(() => import('./views/Logout'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/logout', name: 'Logout', element: Logout },
]

export default routes
