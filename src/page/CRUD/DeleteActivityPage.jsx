import React,{useContext} from 'react'
import {useParams,useLocation} from "react-router-dom"
import {Context as ActivityContext} from  "../../context/ActivityContext"
import {useHistory} from "react-router-dom";
import { toast } from 'react-toastify';

function DeleteActivity() {

    const {deleteActivity} = useContext(ActivityContext)

    const activity = useParams()
    const item = useLocation().state
    const history = useHistory();

    const executeDeleteActivity = () => {
        try{
            const activityObject = { activity: activity.title.toLowerCase(), item:item}
            
            deleteActivity(activityObject)            
            toast.success(`${item.title} is deleted succesfully`)

            history.replace({
                pathname:"/overview"
            })
    
        }catch(e){
            toast.error("Something went wrong when trying to delete. Please try again!")

            history.replace({
                pathname:"/overview"
            })
        }

    }

    return (
        <div className="container mx-auto h-screen">
            <div className="sm:h-screen sm:w-full sm:p-8">
                <div className="container sm:h-3/4 bg-blue-300 flex flex-col items-center">
                    
                <div className="flex flex-col items-center">
                    <h1 className="text-2xl py-2 sm:font-plus-rounded sm:text-5xl  sm:w-max sm:mt-4 sm:mb-8">Delete Activity</h1>
                </div>
                    <div className="font-plus-rounded text-center py-6 sm:text-2xl sm:py-6">
                        <p>Are you sure you want to delete {item.title}?</p>
                    </div>
                    <button className="bg-red-800 px-6 py-2 w-full sm:w-1/3  sm:text-xl text-white sm:rounded-lg" onClick={()=>executeDeleteActivity()}>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteActivity
