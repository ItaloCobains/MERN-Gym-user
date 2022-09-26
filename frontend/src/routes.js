import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

const Logout = React.lazy(() => import('./views/Logout'))

const Refeicoes = React.lazy(() => import('./views/Refeicoes.js'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/logout', name: 'Logout', element: Logout },
  { path: '/refeicao', name: 'Refeicao', element: Refeicoes },
]

export default routes
