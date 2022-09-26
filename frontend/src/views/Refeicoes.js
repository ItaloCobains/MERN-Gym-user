import CIcon from '@coreui/icons-react'

import { cilCheck } from '@coreui/icons'

import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CInputGroup,
  CInputGroupText,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CRow,
  CTable,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'

import useApi from './../services/api'

const Refeicao = () => {
  const api = useApi()

  const [loading, setLoading] = useState(true)
  const [list, setList] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [modalLoading, setModalLoading] = useState(false)
  const [modalId, setModalId] = useState('')
  const [modalNome, setModalNome] = useState('')
  const [modalCalorias, setModalCalorias] = useState('')
  const [modalDescricao, setModalDescricao] = useState('')

  const handleCloseModal = () => {
    setShowModal(false)
  }

  const handleEditButton = () => {
    setShowModal(true)
  }

  const handleNewButton = () => {
    setModalId('')
    setModalNome('')
    setModalCalorias('')
    setModalDescricao('')
    setShowModal(true)
  }

  const handleModalSave = async () => {
    if (modalId && modalNome && modalCalorias && modalDescricao) {
      setModalLoading(true)
      const result = await api.updateRefeição(modalId, {
        nome: modalNome,
        cal: modalCalorias,
        descricao: modalDescricao,
      })
      setModalLoading(false)
      if (result.error === '') {
        setShowModal(false)
        getList()
      } else {
        alert(result.error)
      }
    } else {
      alert('Preencha os campos')
    }
  }

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
    <>
      <CRow>
        <CCol>
          <h2>Refeições</h2>

          <CCard>
            <CCardHeader>
              <CButton color="primary" style={{ marginRight: '15px' }} onClick={handleNewButton}>
                <CIcon icon={cilCheck} style={{ marginRight: '5px' }} />
                Nova Refeição
              </CButton>
              <CButton
                color="info"
                onClick={() => handleEditButton()}
                style={{ marginRight: '15px' }}
              >
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

      <CModal visible={showModal} onClose={handleCloseModal}>
        <CModalHeader closeButton>Editar Refeição</CModalHeader>
        <CModalBody>
          <CInputGroup style={{ padding: '10px' }}>
            <CInputGroupText htmlFor="modal-id">Id</CInputGroupText>
            <CFormInput
              type="text"
              id="modal-id"
              placeholder="Digite o id da refeição."
              value={modalId}
              onChange={(e) => setModalId(e.target.value)}
              disabled={modalLoading}
            />
          </CInputGroup>

          <CInputGroup style={{ padding: '10px' }}>
            <CInputGroupText htmlFor="modal-Nome">Nome</CInputGroupText>
            <CFormInput
              type="text"
              id="modal-Nome"
              placeholder="Digite o nome da refeição."
              value={modalNome}
              onChange={(e) => setModalNome(e.target.value)}
              disabled={modalLoading}
            />
          </CInputGroup>

          <CInputGroup style={{ padding: '10px' }}>
            <CInputGroupText htmlFor="modal-Calorias">Calorias</CInputGroupText>
            <CFormInput
              type="number"
              id="modal-Calorias"
              placeholder="Digite as Calorias da refeição."
              value={modalCalorias}
              onChange={(e) => setModalCalorias(e.target.value)}
              disabled={modalLoading}
            />
          </CInputGroup>

          <CInputGroup style={{ padding: '10px' }}>
            <CInputGroupText htmlFor="modal-Descricao">Descrição</CInputGroupText>
            <CFormTextarea
              type="text"
              id="modal-Descricao"
              placeholder="Digite as Calorias da refeição."
              value={modalDescricao}
              onChange={(e) => setModalDescricao(e.target.value)}
              disabled={modalLoading}
            />
          </CInputGroup>
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={handleModalSave} disabled={modalLoading}>
            {modalLoading ? 'Carregando' : 'Salvar'}
          </CButton>
          <CButton color="secondary" onClick={handleCloseModal} disabled={modalLoading}>
            Cancelar
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default Refeicao
