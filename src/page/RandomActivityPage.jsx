import { IoTimeSharp } from 'react-icons/io5';
import ACTIVITY_DATA from '../mock-data';
import Activity from '../components/activityComponents/Activity';
import { act } from 'react-dom/test-utils';

const RandomActivityPage = () => {

  let activities = ACTIVITY_DATA
  // get random activity from list of activities
  let randomActivity = activities[Math.floor(Math.random()*activities.length)];

  console.log(randomActivity)
  
  return (
    <div className="container mx-auto h-screen w-full">
      <div className="sm:py-8"></div>
            <div className="container  sm:h-3/4 bg-blue-300 flex flex-col items-center justify-center">  
                <div className="flex flex-col items-center">
                    <h1 className="font-plus-rounded text-4xl text-center sm:text-5xl  sm:w-max mt-4 mb-8">Random Activity:</h1>
                </div>
                <div className="flex flex-col items-center">
                   <p>{randomActivity.title} categorised as {randomActivity.type}, for {randomActivity.participants} people at {randomActivity.location} which costs €{randomActivity.price}. 
                   </p>
                </div>
            </div>
    </div>
  
  )

}

export default RandomActivityPage




