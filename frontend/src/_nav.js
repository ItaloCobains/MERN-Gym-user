import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilSpeedometer, cilFastfood, cibUpwork } from '@coreui/icons'
import { CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Painel Geral',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'GYM',
  },
  {
    component: CNavItem,
    name: 'Refeições',
    to: '/theme/colors',
    icon: <CIcon icon={cilFastfood} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Treino',
    to: '/theme/typography',
    icon: <CIcon icon={cibUpwork} customClassName="nav-icon" />,
  },
]

export default _nav
