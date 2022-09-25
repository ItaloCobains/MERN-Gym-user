import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useApi from '../services/api'

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const api = useApi()
  const navigate = useNavigate()

  useEffect(() => {
    const doLogout = async () => {
      await api.logout()
      navigate('/login')
    }
    doLogout()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return null
}
