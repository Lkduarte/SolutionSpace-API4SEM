import { useEffect, createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createSession, api, verifyToken } from '../api/api'
import { useAlert } from '../services'

export const AuthContext = createContext({} as any)

export const AuthProvider = ({ children }: any) => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const alert = useAlert()
  let interval: any;

  const updateUser = (user: any) => {
    setUser(user)
    localStorage.setItem('user', JSON.stringify(user))
  }

  const loadCookies = async () => {
    const recoveredUser = localStorage.getItem('user')
    const recoveredToken = localStorage.getItem('token')

    if (recoveredUser && recoveredToken) {
      try {
        const response = await verifyToken(recoveredToken) 

        setUser(response.data.user)
        localStorage.setItem('user', JSON.stringify(response.data.user))
        api.defaults.headers.Authorization = `Bearer ${recoveredToken}`
        api.defaults.headers.common = { Authorization: `Bearer ${recoveredToken}` }
        api.defaults.withCredentials = true
        
        setLoading(false)
        return true
      } catch(e) {

        localStorage.removeItem('user')
        localStorage.removeItem('token')
        
        api.defaults.headers.Authorization = null
        api.defaults.headers.common = { Authorization: `` }
        api.defaults.withCredentials = false
    
        setUser(null)
    
        navigate('/login')

        setLoading(false)
        return false
      }

    }

    if(interval){
      clearInterval(interval)
      interval = null
    }

    setLoading(false)
    return false
  }

  const createInterval = () => {
    interval = setInterval(async ()=> {
      await loadCookies()
    }, 10000)
  }

  const carregar = async () => {
    const response = await loadCookies()
    if(response){
      createInterval()
    }
  }
  
  useEffect(() => {
    carregar()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const response = await createSession(email, password)
      const loggedUser = response.data.user
      const token = response.data.token

      localStorage.setItem('user', JSON.stringify(loggedUser))
      localStorage.setItem('token', token)

      api.defaults.headers.Authorization = `Bearer ${token}`
      api.defaults.headers.common = { Authorization: `Bearer ${token}` }
      api.defaults.withCredentials = true

      setUser(loggedUser)
      setLoading(false)

      navigate('/home')

      createInterval()
    } catch (e: any) {
      console.log(e)
      const responseMessage = e.response.data
      let errorMessage

      if (responseMessage.includes('Email not found')) {
        errorMessage = 'E-mail ou senha inválidos.'
      } else if (responseMessage.includes('Incorrect password')) {
        errorMessage = 'E-mail ou senha inválidos.'
      } else {
        errorMessage = responseMessage
      }

      alert.criarAlerta({
        icon: 'error',
        html: errorMessage
      })
    }
  }

  const logout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')

    api.defaults.headers.Authorization = null
    api.defaults.headers.common = { Authorization: `` }
    api.defaults.withCredentials = false

    setUser(null)

    navigate('/login')

    if(interval) {
      clearInterval(interval)
      interval = null
    }
  }

  return (
    
    <AuthContext.Provider value={{ authenticated: !!user, user, loading, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}
