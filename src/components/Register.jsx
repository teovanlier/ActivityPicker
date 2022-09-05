import { useCallback, useEffect,useState } from "react";
import { useHistory } from "react-router";
import { useRegister, useSession } from "../context/AuthProvider";
import { useFormik } from 'formik';
import LoginRegisterButton from "./LoginRegisterButton";
import InputComponent from "./InputComponent";

export default function Register(){

        const register = useRegister()
        const history = useHistory()
        const [disableButton, setDisableButton] = useState(true)

        const {loading, registerError, isAuthed} = useSession()


        useEffect(()=>{
            if(isAuthed){
                history.replace('/')
            }else{
                history.replace('/login')
            }
        },[history, isAuthed])


        const validate = values  => {
            const errors = {}
    
            const nameContainsNumberCheck = new RegExp("[0-9]")
            //found on internet
            const emailCheck = new RegExp("^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$")
            
            if(!values.name){
                errors.name = "This field is required"
            }else if(values.name.length < 2){
                errors.name = "Name should contain at least 2 characters!"
            } else if(nameContainsNumberCheck.exec(values.name)){
                errors.name = "Name can not contain a number!"
            }

            if(!values.email){
                errors.email = "Required"
            }else if(!emailCheck.test(values.email)){
                errors.email = "Email is not in the right format!"
            }

            if(!values.password){
                errors.password = "This field is required"
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
                name:"",
                email:'',
                password:""
            },
            validate:validate,
            onSubmit: values => {
                try{
                    handleRegister()
                }catch(e){
                    console.log("An unexpected problem happened in the Register component")
                }
            }
        })

        const handleRegister = useCallback(async ()=>{

            const {name,email,password} = formikStates.values;
            const success = await register(name,email,password)

            if(success){
                history.replace('/')
            }

        },[register,history,formikStates.values])


        return(
            <div className="bg-white sm:bg-blue-300 w-3/4 p-4">
                <form onSubmit={formikStates.handleSubmit}>
                    <h1 className="font-plus-rounded text-2xl mb-4">Register</h1>
                    
                    <InputComponent type="text" placeholder="Name" labelname="name" stateName="name" formikStates={formikStates}/>
                    
                    <InputComponent type="email" placeholder="E-mail" labelname="email" stateName="email" formikStates={formikStates}/>
                    
                    <InputComponent type="password" placeholder="******" labelname="password" stateName="password" formikStates={formikStates}/>

                    <LoginRegisterButton disableButton={disableButton && loading} text={"Register"}/>                    
                    {
                        registerError?(<p className="text-red-500">{registerError}</p>):null
                    }
                </form>
            </div>
        )
}