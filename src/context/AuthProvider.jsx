import { createContext,useState, useMemo,useCallback, useEffect, useContext} from "react"
import * as LoginApi from "../api/LoginApi"


const AuthContext = createContext()

const useAuth = () => useContext(AuthContext);

export const useLogin = () => {
    const { login } = useAuth()
    return login; 
}

export const useRegister = () => {
    const { register } = useAuth()
    return register;
}


export const useLogout = () => {
    const { logout } = useAuth()
    return logout;
}

export const useSession = () => {
    const {loading, loginError, token, registerError} = useAuth()
    return {
        loading,
        registerError,
        loginError,
        token,
        isAuthed: Boolean(token)
    }
}

export const AuthProvider = ({
    children
}) => {

    const[loading,setLoading] = useState(false)
    const [error, setError] = useState('')
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [user, setUser] = useState(null)
    const [loginError, setLoginError] = useState('')
    const [registerError, setRegisterError] = useState('')

    //user bijhouden in local storage
    useEffect(()=>{
        if(token){
            localStorage.setItem('token',token)
        } else{
            localStorage.removeItem('token')
        }
    },[token])

    const login = useCallback(async (email,password)=>{
        try {
            setLoading(true)
            setLoginError('')
            const data = await LoginApi.login({email,password})
            localStorage.setItem("token",data.token)
            setToken(data.token)
            setUser({name:"teo",roles:["tester"]})
            return true
        } catch (error) {
            setLoginError('Login failed, try again')
            return false
        }finally{
            setLoading(false)
        }

    },[])

    const register = useCallback(async (name,email,password)=>{
        try {
            setLoading(true)
            setRegisterError('')
            const data = await LoginApi.register({name,email,password})
            localStorage.setItem("token",data.token)
            setToken(data.token)
            setUser({name:name,roles:["tester"]})
            return true
        } catch (error) {
            setRegisterError('register failed, try again')
            return false
        }finally{
            setLoading(false)
        }

    },[])

    const logout = useCallback( () => {
            setToken(null)
            setUser(null)
    },[])

    const value = useMemo(() => ({
        token,
        user,
        loading,
        login,
        register,
        logout,
        loginError,
        registerError
      }), [token, user, loading, login, logout,register,registerError,loginError]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}



