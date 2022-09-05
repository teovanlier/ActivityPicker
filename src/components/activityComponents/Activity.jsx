import CashRating from "./CashRating";
import React from 'react';
import { Link } from "react-router-dom";
import { IoTrashSharp, IoBuildSharp } from "react-icons/io5";


  const Activity = ({title, type, participants,location, price, id}) => {
    return (
      <div>
        <div className="bg-red-200 text-left"> 
        {title} categorised as {type}, for {participants} people at {location} which costs €{price}.
        </div>
        <div className="flex">
        <Link to={{
            pathname:`/overview/${title}/delete/${title}`,
            state:{title,type,participants, location, price, id}
        }}>
            <IoTrashSharp className="mr-2 hover:text-red-500 cursor-pointer"/>
        </Link>
        <Link to={{
            pathname:`/overview/${title}/edit/${title}`,
            state:{title,type,participants, location, price, id}
        }}>
            <IoBuildSharp className="hover:text-yellow-400 cursor-pointer"/>
        </Link>
        </div>
      </div>
    )
  }


export default Activity
