import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilSpeedometer, cilFastfood, cibUpwork, cilUser, cilAccountLogout } from '@coreui/icons'
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
    to: '/refeicao',
    icon: <CIcon icon={cilFastfood} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Treino',
    to: '/treino',
    icon: <CIcon icon={cibUpwork} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Configuração',
  },

  {
    component: CNavItem,
    name: 'Sair',
    to: '/logout',
    icon: <CIcon icon={cilAccountLogout} customClassName="nav-icon" />,
  },
]

export default _nav
