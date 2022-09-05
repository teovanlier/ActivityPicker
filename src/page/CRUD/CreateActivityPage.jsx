import React,{useContext,useState} from 'react'
import {useParams,useLocation} from "react-router-dom";
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import {Context as ActivityContext} from '../../context/ActivityContext'
import {useHistory} from "react-router-dom";
import classNames from 'classnames';

export default function CreateActivity({isEdit=false}) {
    const activity = useParams()
    const product = useLocation()?.state
    const {addProduct,editProduct} = useContext(ActivityContext)
    const history = useHistory()
    const [disableButton, setDisableButton] = useState(!isEdit)

  //title, participants, type, location, id
    const validate = values  => {
        const errors = {}

        if(!values.title){
            errors.name = "Required"
        } else if(values.title.length < 3){
            errors.name = "Name of activity needs to be more than 3 characters"
        }

        if(!values.type){
          errors.name = "Required"
        } else if(values.type.length < 3){
          errors.name = "Type of activity needs to be more than 3 characters"
        }

        if(!values.location){
          errors.name = "Required"
        } else if(values.location.length < 1){
          errors.name = "Location of activity needs to be more than 1 character"
        }

        if(isNaN(values.price)){
            errors.price = "Price can only be a number!" 
        }

        if(values.price < 0){
            errors.price = "Price can not be negative!" 
        }
        
        if(isNaN(values.price)){
          errors.price = "Participants can only be a number!" 
        }

        if(values.participants < 0){
          errors.participants = "Number of participants can not be negative!" 
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
            title:product?product.title:"",
            type:product?product.type:"",
            location:product?product.location:"",
            price:product?product.price:0,
            participants:product?product.participants:0,
            id:product?product.id:null
        },
        validate:validate,
        onSubmit: values => {
            try{
                const activityObject = { activity: activity.title.toLowerCase(), product:values}
                
                if(isEdit){
                    editProduct(activityObject) 
                }else{
                    addProduct(activityObject)
                }
                
                toast.success(`${activityObject.product.title} ${isEdit?'edited':'added'} succesfully to ${activityObject.activity}`)    
                
                history.replace({
                    pathname:'/overview'
                })
            }catch(e){
                toast.error(`Something went wrong when trying to ${isEdit?'edit':'create'}. Please try again!`)    
                
                history.replace({
                    pathname:'/overview'
                })
            }
        }
    })

    const buttonClass = classNames({
        'bg-green-600 ' : false === disableButton,
        'bg-gray-400' : true === disableButton
    })

    return (
        <div className="container mx-auto h-screen sm:p-8">
            <div className="sm:h-4/6 sm:bg-blue-300  sm:rounded-3xl sm:p-5">
            <div className="flex flex-col items-center">
                <h1 className="text-2xl py-2 sm:font-plus-rounded sm:text-5xl  sm:w-max sm:mt-4 sm:mb-8">{isEdit?'Edit the selected activity':`Add activity too ${activity.title}`}</h1>
            </div>
                <form onSubmit={formikStates.handleSubmit}>
                    
                    <div className="p-5 sm:w-full sm:flex sm:justify-between">
                    <label className="pr-5 font-plus-rounded text-lg sm:text-2xl py-1" htmlFor="title">Name of activity:</label>
                    <div className="flex flex-col w-2/4">
                        <input className="border-2 border-black text-sm rounded-md  sm:text-xl sm:py-1 pl-2" onChange={formikStates.handleChange} value={formikStates.values.title} id="title" name="title"/>
                        {(formikStates.errors.title ? (<div className="block text-red-700 text-sm sm:text-base ">{formikStates.errors.title}</div>):null)}
                    </div>
                    </div>

                    <div className="p-5 sm:w-full sm:flex sm:justify-between">
                    <label className="pr-5 font-plus-rounded text-lg sm:text-2xl py-1" htmlFor="type">Type of activity:</label>
                    <div className="flex flex-col w-2/4">
                        <input className="border-2 border-black text-sm rounded-md  sm:text-xl sm:py-1 pl-2" onChange={formikStates.handleChange} value={formikStates.values.type} id="type" name="type"/>
                        {(formikStates.errors.type ? (<div className="block text-red-700 text-sm sm:text-base ">{formikStates.errors.type}</div>):null)}
                    </div>
                    </div>

                    <div className="p-5 sm:w-full sm:flex sm:justify-between">
                    <label className="pr-5 font-plus-rounded text-lg sm:text-2xl py-1" htmlFor="participants">Number of participants:</label>
                        <div className="flex flex-col w-2/4">
                        <input className="border-2 border-black text-sm rounded-md sm:text-xl sm:py-1 pl-2" type="number" onChange={formikStates.handleChange} value={parseInt(formikStates.values.participants)} id="participants" name="participants"/>
                        {(formikStates.errors.participants && (<div className="text-red-700">{formikStates.errors.participants}</div>))}
                        </div>
                    </div>

                    <div className="p-5 sm:w-full sm:flex sm:justify-between">
                    <label className="pr-5 font-plus-rounded text-lg sm:text-2xl py-1" htmlFor="location">Location of activity:</label>
                    <div className="flex flex-col w-2/4">
                        <input className="border-2 border-black text-sm rounded-md  sm:text-xl sm:py-1 pl-2" onChange={formikStates.handleChange} value={formikStates.values.location} id="location" name="location"/>
                        {(formikStates.errors.location ? (<div className="block text-red-700 text-sm sm:text-base ">{formikStates.errors.location}</div>):null)}
                    </div>
                    </div>

                    <div className="p-5 sm:w-full sm:flex sm:justify-between">
                    <label className="pr-5 font-plus-rounded text-lg sm:text-2xl py-1" htmlFor="price">Price:</label>
                        <div className="flex flex-col w-2/4">
                        <input className="border-2 border-black text-sm rounded-md sm:text-xl sm:py-1 pl-2" type="number" onChange={formikStates.handleChange} value={parseInt(formikStates.values.price)} id="price" name="price"/>
                        {(formikStates.errors.price && (<div className="text-red-700">{formikStates.errors.price}</div>))}
                        </div>
                    </div>

                    <div className="container w-full flex flex-col items-center mt-8">
                        <div className={`${buttonClass} w-full text-center sm:w-96`}>
                            <button disabled={disableButton} className="justify-center text-xl sm:text-2xl font-plus-rounded text-white sm:w-96 p-4 w-full" type="submit">{isEdit?"EDIT":"ADD"}</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
