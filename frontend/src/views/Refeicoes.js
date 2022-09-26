import CIcon from '@coreui/icons-react'

import { cilCheck } from '@coreui/icons'

import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'

import useApi from './../services/api'

const Refeicao = () => {
  const api = useApi()

  const [loading, setLoading] = useState(true)
  const [list, setList] = useState([])

  useEffect(() => {
    getList()
  }, [])

  const getList = async () => {
    setLoading(true)
    const result = await api.getRefeicao()
    setLoading(false)
    if (result.refeicao) {
      setList(result.refeicao)
    } else {
      alert(result.error)
    }
  }

  return (
    <CRow>
      <CCol>
        <h2>Refeições</h2>

        <CCard>
          <CCardHeader>
            <CButton color="primary">
              <CIcon icon={cilCheck} style={{ marginRight: '5px' }} />
              Nova Refeição
            </CButton>
          </CCardHeader>
          <CCardBody>...</CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Refeicao
