import CIcon from '@coreui/icons-react'

import { cilCheck } from '@coreui/icons'

import {
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableDataCell,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'

import useApi from './../services/api'

const Refeicao = () => {
  const api = useApi()

  const [loading, setLoading] = useState(true)
  const [list, setList] = useState([])

  const fields = [
    {
      key: 'id',
      label: '#',
      _props: { scope: 'col' },
      _style: { width: '1px' },
    },
    {
      key: 'dateCreated',
      label: 'Date de criação',
      _props: { scope: 'col' },
    },
    {
      key: 'nome',
      label: 'Nome',
      _props: { scope: 'col' },
    },
    {
      key: 'cal',
      label: 'Calorias',
      _props: { scope: 'col' },
      _style: { width: '1px' },
    },
    {
      key: 'descricao',
      label: 'Descrição',
      _props: { scope: 'col' },
    },
    // {
    //   key: 'image',
    //   label: 'Image',
    //   _props: { scope: 'col' },
    // },
  ]

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
            <CButton color="primary" style={{ marginRight: '15px' }}>
              <CIcon icon={cilCheck} style={{ marginRight: '5px' }} />
              Nova Refeição
            </CButton>
            <CButton color="info" style={{ marginRight: '15px' }}>
              <CIcon icon={cilCheck} style={{ marginRight: '5px' }} />
              Editar Refeição
            </CButton>
            <CButton color="danger">
              <CIcon icon={cilCheck} style={{ marginRight: '5px' }} />
              Excluir Refeição
            </CButton>
          </CCardHeader>
          <CCardBody>
            <CTable
              stripedColumns
              items={list}
              columns={fields}
              loading={loading}
              noItemsViewSlot=" "
              hover
              bordered
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Refeicao
