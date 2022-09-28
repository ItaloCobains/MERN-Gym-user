import React, { useState } from 'react'
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser, cilHappy, cilChart } from '@coreui/icons'
import useApi from '../../../services/api'
import { useNavigate } from 'react-router'

const Register = () => {
  const api = useApi()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [biotipo, setBiotipo] = useState('')
  const [peso, setPeso] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleRegisterButton = async () => {
    if (name && email && password && biotipo && peso) {
      setError('')
      setLoading(true)
      const result = await api.register(name, email, password, biotipo, peso)
      setLoading(false)
      if (result.error === '') {
        localStorage.setItem('token', result.token)
        navigate('/')
      } else {
        setError('Verifique os dados')
      }
    }
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Registrar</h1>

                  {error !== '' && <CAlert color="danger">{error}</CAlert>}

                  <p className="text-medium-emphasis">Crie sua conta</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Nome"
                      autoComplete="username"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={loading}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      placeholder="Email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={loading}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={loading}
                    />
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilHappy} />
                    </CInputGroupText>
                    <CFormInput
                      type="text"
                      placeholder="Biotipo"
                      autoComplete="new-Biotipo"
                      value={biotipo}
                      onChange={(e) => setBiotipo(e.target.value)}
                      disabled={loading}
                    />
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilChart} />
                    </CInputGroupText>
                    <CFormInput
                      type="number"
                      placeholder="Peso"
                      autoComplete="new-Peso"
                      value={peso}
                      onChange={(e) => setPeso(e.target.value)}
                      disabled={loading}
                    />
                  </CInputGroup>

                  <div className="d-grid">
                    <CButton disabled={loading} onClick={handleRegisterButton} color="success">
                      {loading ? 'Carregando' : 'Criar conta'}
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
