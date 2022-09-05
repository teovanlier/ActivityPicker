import React,{useState,useCallback} from "react";
import {NavLink} from "react-router-dom";
import logo from "../assets/logo.png"
import { IoMenu, IoClose } from "react-icons/io5";
import { useSession, useLogout } from "../context/AuthProvider";


const Header = () => {

    const [drop,setDrop] = useState(false)
    const { isAuthed } = useSession()
    const logout = useLogout()

    const dropOpenMenu = useCallback(()=>{
        setDrop(!drop) 
    },[drop])

    const handleLogout = useCallback(()=>{
        logout()
    },[logout])



    return(
        <div className="w-full bg-green-500 flex sm:flex-row flex-col justify-between">
            <div className="flex justify-between p-2">
                <div className="flex items-center">
                    <img src={logo} alt="Logo" className=" h-10 sm:h-16 mr-2"/>   
                    <h1 className="font-plus-rounded text-lg sm:text-3xl font-extrabold">ActivityPicker</h1>
                </div>
                <button onClick={dropOpenMenu} className="inline sm:hidden">
                    {drop? <IoClose className="text-2xl"/> : <IoMenu className="text-2xl"/> }
                </button>
            </div>
            <div className="bg-gray-400">
                <nav className="h-full">
                    
                    <ul className={`${drop?'flex':'hidden'} sm:flex flex-col sm:flex-row justify-center items-center h-full bg-green-500 text-sm sm:text-base`}>
                        {!isAuthed?
                            (
                                <li className="font-plus-rounded my-1 px-3 ">
                                    <NavLink exact to="/login" activeClassName="text-blue-700">Login</NavLink>
                                </li>
                            )
                            :
                            (
                            <>
                                <li className="font-plus-rounded my-1 px-3 ">
                                    <NavLink exact to="/" activeClassName="text-blue-700">Home</NavLink>
                                </li>
                        
                                <li className="font-plus-rounded my-1 px-3">
                                    <NavLink  
                                        exact
                                        to="/overview"
                                        activeClassName="text-blue-700"
                                        >Activity Overview</NavLink>
                                </li>
                        
                                <li className="font-plus-rounded my-1 px-3">
                                    <NavLink 
                                    exact
                                    to="/randomactivity"
                                    activeClassName="text-blue-700"
                                    >Random Activity</NavLink>
                                </li>

                                <div className="font-plus-rounded my-1 px-3 ">
                                    <button onClick={handleLogout} className="text-red-400" type="button">Logout</button>
                                </div>
                            </>
                            )
                        }
                        
                        
                        
                        
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default Header