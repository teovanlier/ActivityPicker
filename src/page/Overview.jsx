import React,{useContext,useLayoutEffect} from "react";
import CreateActivityPage from './CRUD/CreateActivityPage';
import DeleteActivityPage from './CRUD/DeleteActivityPage';
import { Context as ActivityContext} from '../context/ActivityContext'; 
import Activity from "../components/activityComponents/Activity";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoAddCircleSharp } from "react-icons/io5";
import {
  Switch,
  Route,
  useRouteMatch,
  Link
} from "react-router-dom";

const title = ""

const OverviewPage = () => {
  let match = useRouteMatch();

  return(

      <div className="h-full">
          <Switch>
              <Route exact path={`${match.path}/:title/edit/:activity`}>
                  <CreateActivityPage isEdit={true}/>
              </Route>
      
              <Route exact path={`${match.path}/:title/create`}>
                  <CreateActivityPage/>
              </Route>
      
              <Route exact path={`${match.path}/:title/delete/:activity`}>
                  <DeleteActivityPage/>
              </Route>
              
              <Route exact path={match.path}>
                  <Overview/>
              </Route>
          </Switch>
      </div>
  )
}

const Overview = () => {
  const {state:activityState} = useContext(ActivityContext)
    useLayoutEffect(()=>{
      localStorage.setItem('activityData',JSON.stringify(activityState))
  },[activityState])

  return (
    <div className="container mx-auto h-screen">
        <div className="sm:py-8">
            <div className="bg-blue-300 w-full">    
                <div className="h-24 w-full justify-center items-center flex">
                    <h1 className="font-plus-rounded text-4xl">Overview of activities</h1>
                </div>
                <Link to={`/overview/${title.toLowerCase()}/create`}>
                <IoAddCircleSharp className='text-3xl hover:text-green-500 cursor-pointer'/>
                </Link>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <Activity title="Go play football" participants="8" location="a football field" price="3" type="sport" id="1"/>
                    <Activity title="Take a hike at a local park" participants="1" location="a local park" price="0" type="recreational" id="2"/>
                    <Activity title="Play billiard" participants="2" location="anywhere with a billiard table" price="2" type="sport" id="3"/>
                    <Activity title="Try to throw a 180 in darts" participants="1" location="A cafe with a dart board" price="0" type="sport" id="4"/>
                    <Activity title="Configure two-factor authentication on your accounts" participants="1" location="home" price="0" type="chores" id="55"/>
                    <Activity title="Do the dishes" participants="1" location="the kitchen" price="0" type="chores" id="5"/>
                    <Activity title="Make a scrapbook with pictures of your favorite memories" participants="1" location="home" price="0.1" type="diy" id="6"/>
                    <Activity title="Go to an escape room" participants="4" location="an escape room" price="20" type="social" id="7"/>

                    <ToastContainer/>
                </div>
            </div>
        </div>
    </div>
)

}

export default OverviewPage