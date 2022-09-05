//https://daisyui.com/components/alert/
import React from 'react'

function AlertDaisy() {
    return (
        <div className="alert bg-red-300">
        <div className="flex-1">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#ff5722" className="w-6 h-6 mx-2">    
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path>                      
          </svg> 
          <label></label>
        </div> 
        <div className="flex-none">
        </div>
      </div>
    )
}

export default AlertDaisy
