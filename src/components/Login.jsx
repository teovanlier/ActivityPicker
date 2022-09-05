import { useCallback, useEffect,useState } from "react";
import { useFormik } from 'formik';
import { useHistory } from "react-router";
import { useLogin, useSession } from "../context/AuthProvider";
import InputComponent from "./InputComponent";
import LoginRegisterButton from "./LoginRegisterButton";


export default function Login(){

        const login = useLogin()
        const history = useHistory()
        const {loading, loginError, isAuthed} = useSession()
        const [disableButton, setDisableButton] = useState(true)


        useEffect(()=>{
            if(isAuthed){
                history.replace('/')
            }else{
                history.replace('/login')
            }
        },[history, isAuthed])

        const validate = values  => {
            const errors = {}
            //found on internet
            const emailCheck = new RegExp("^[a-zA-Z0-9._:$!%-]+@+[a-zA-Z0-9.-]+.[a-zA-Z]$")

            if(!values.email){
                errors.email = "Required"
            }else if(!emailCheck.test(values.email)){
                errors.email = "Email doesn't contain right syntax!"
            }

            if(!values.password){
                errors.password = "Required"
            }
    
            if (Object.keys(errors).length === 0){
                setDisableButton(false)
            } else{
                setDisableButton(true)
            }
    
            return errors
        }
    
        const formikStates = useFormik({
            initialValues:{
                email:"",
                password:""
            },
            validate:validate,
            onSubmit: values => {
                try{
                    handleLogin()
                }catch(e){
                    console.log("An unexpected problem happened in the Login component")
                }
            }
        })

        const handleLogin = useCallback(async () => {

            const {email,password} = formikStates.values;
            const success = await login(email,password)

            if(success){
                history.replace('/')
            }

        },[login,history,formikStates.values])


        return(
            <div className="bg-white sm:bg-blue-300 w-3/4 p-4">
            <form onSubmit={formikStates.handleSubmit}>
                <h1 className="font-plus-rounded text-2xl mb-4">Login</h1>

                <InputComponent type="email" labelname="email" stateName="email" formikStates={formikStates} placeholder="E-mail"/>

                <InputComponent type="password" labelname="password" stateName="password" formikStates={formikStates} placeholder="********"/>

                <LoginRegisterButton datatestid={"loginbutton"} disableButton={disableButton && loading} text={"Login"}/>
                {
                    loginError?(<p className="text-red-500">{loginError}</p>):null
                }
            </form>
        </div>
        )
}