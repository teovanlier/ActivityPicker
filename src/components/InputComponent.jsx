export default function InputComponent({labelname="",stateName='name', type='text', placeholder="", formikStates}) {
    
  return(
      <>
      <div className="flex items-center">
          <label className="pr-5 font-plus-rounded  py-1" htmlFor={stateName}>{labelname}</label>
          <div className="flex flex-col w-40">
              <input type={type} placeholder={placeholder} className="border-2 text-sm rounded-md px-2" onChange={formikStates.handleChange} value={formikStates.values[stateName]} id={stateName} name={stateName}/>
          </div>
      </div>
      {(formikStates.errors[stateName] ? (<div className="block text-red-700 text-sm sm:text-sm ">{formikStates.errors[stateName] }</div>):null)}  
      </>
  )

}