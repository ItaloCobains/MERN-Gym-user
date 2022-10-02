import { cilCheck } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormInput,
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
import useApi from '../services/api'

export default function Treino() {
  const api = useApi()

  const [loading, setLoading] = useState(true)
  const [list, setList] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [modalLoading, setModalLoading] = useState(false)
  const [modalState, setModalState] = useState('')

  const [diaDaSemana, setDiaDaSemana] = useState('')
  const [modalId, setModalId] = useState('')
  const [modalNome, setModalNome] = useState('')
  const [modalRepetiçoes, setModalRepetiçoes] = useState(0)
  const [modalCarga, setModalCarga] = useState('')

  useEffect(() => {
    getList()
  }, [])

  const getList = async () => {
    setLoading(true)
    const result = await api.getTreino()
    setLoading(false)
    if (result.treino) {
      setList(result.treino)
    } else {
      alert(result.error)
    }
  }
  const handleCloseModal = () => {
    setShowModal(false)
  }

  const handleEditButton = () => {
    setModalId('')
    setDiaDaSemana('')
    setModalNome('')
    setModalRepetiçoes(0)
    setModalCarga('')
    setShowModal(true)
  }

  const handleNewButton = () => {
    setDiaDaSemana('')
    setModalNome('')
    setModalRepetiçoes(0)
    setModalCarga('')
    setModalState('new')
    setShowModal(true)
  }

  const handleRemoveButton = () => {
    setModalId('')
    setDiaDaSemana('')
    setModalNome('')
    setModalRepetiçoes(0)
    setModalCarga('')
    setModalState('delete')
    setShowModal(true)
  }

  const handleModalSave = async () => {
    if (modalState === '') {
      EditSave()
    } else if (modalState === 'new') {
      newSave()
    } else {
      deleteSave()
    }
  }

  const deleteSave = async () => {
    if (modalId) {
      if (window.confirm('Tem certeza que deseja excluir ?')) {
        setModalLoading(true)
        const result = await api.deleteTreino(modalId)
        setModalLoading(false)
        if (result.error === '') {
          setShowModal(false)
          getList()
        } else {
          alert(result.error)
        }
      }
    } else {
      alert('Preencha os campos')
    }
  }

  const newSave = async () => {
    if (modalNome && modalRepetiçoes && modalCarga && diaDaSemana) {
      setModalLoading(true)
      const result = await api.addTreino({
        nome: modalNome,
        diaDaSemana: diaDaSemana,
        repetiçoes: modalRepetiçoes,
        carga: modalCarga,
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

  const EditSave = async () => {
    if (modalId && modalNome && modalRepetiçoes && modalCarga && diaDaSemana) {
      setModalLoading(true)
      const result = await api.updateTreino(modalId, {
        nome: modalNome,
        repetiçoes: modalRepetiçoes,
        carga: modalCarga,
        diaDaSemana: diaDaSemana,
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
      key: '_id',
      label: '#',
      _props: { scope: 'col' },
      _style: { width: '1px' },
    },
    {
      key: 'diaDaSemana',
      label: 'Dia da Semana',
      _props: { scope: 'col' },
    },
    {
      key: 'nome',
      label: 'Nome',
      _props: { scope: 'col' },
    },
    {
      key: 'repetiçoes',
      label: 'Repetições',
      _props: { scope: 'col' },
      _style: { width: '1px' },
    },
    {
      key: 'carga',
      label: 'Carga',
      _props: { scope: 'col' },
    },
  ]

  return (
    <>
      <CRow>
        <CCol>
          <h2>Treino</h2>
          <CCard>
            <CCardHeader>
              <CButton color="primary" style={{ marginRight: '15px' }} onClick={handleNewButton}>
                <CIcon icon={cilCheck} style={{ marginRight: '5px' }} />
                Novo Treino
              </CButton>
              <CButton
                color="info"
                onClick={() => handleEditButton()}
                style={{ marginRight: '15px' }}
              >
                <CIcon icon={cilCheck} style={{ marginRight: '5px' }} />
                Editar Treino
              </CButton>
              <CButton color="danger" onClick={() => handleRemoveButton()}>
                <CIcon icon={cilCheck} style={{ marginRight: '5px' }} />
                Excluir Treino
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

      {modalState === 'delete' ? (
        <CModal visible={showModal} onClose={handleCloseModal}>
          <CModalHeader closeButton>Delete Treino</CModalHeader>
          <CModalBody>
            {modalState === 'new' ? null : (
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
            )}
          </CModalBody>
          <CModalFooter>
            <CButton color="primary" onClick={handleModalSave} disabled={modalLoading}>
              {modalLoading ? 'Carregando' : 'Deletar'}
            </CButton>
            <CButton color="secondary" onClick={handleCloseModal} disabled={modalLoading}>
              Cancelar
            </CButton>
          </CModalFooter>
        </CModal>
      ) : (
        <CModal visible={showModal} onClose={handleCloseModal}>
          <CModalHeader closeButton>{modalState === 'new' ? 'Nova' : 'Edite'} Treino</CModalHeader>
          <CModalBody>
            {modalState === 'new' ? null : (
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
            )}

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
              <CInputGroupText htmlFor="modal-Dia da Semana">Dia da Semana</CInputGroupText>
              <CFormInput
                type="text"
                id="modal-Dia da Semana"
                placeholder="Digite o Dia da Semana"
                value={diaDaSemana}
                onChange={(e) => setDiaDaSemana(e.target.value)}
                disabled={modalLoading}
              />
            </CInputGroup>

            <CInputGroup style={{ padding: '10px' }}>
              <CInputGroupText htmlFor="modal-Repetições">Repetições</CInputGroupText>
              <CFormInput
                type="number"
                id="modal-Repetições"
                placeholder="Digite a quantidade de repetições."
                value={modalRepetiçoes}
                onChange={(e) => setModalRepetiçoes(e.target.value)}
                disabled={modalLoading}
              />
            </CInputGroup>

            <CInputGroup style={{ padding: '10px' }}>
              <CInputGroupText htmlFor="modal-Carga">Carga</CInputGroupText>
              <CFormInput
                type="number"
                id="modal-Carga"
                placeholder="Digite as carga do treino."
                value={modalCarga}
                onChange={(e) => setModalCarga(e.target.value)}
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
      )}
    </>
  )
}
