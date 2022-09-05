import classNames from "classnames"

export default function MyButton({disableButton,text,datatestid="",}){
    
    const buttonClass = classNames({
        'bg-green-600 ' : false === disableButton,
        'bg-gray-400' : true === disableButton
    })

    return(
        <div data-testid={datatestid} className={`${buttonClass} w-full text-center`}>
            <button data-testid="button" disabled={disableButton} className="justify-center text-xl rounded font-plus-rounded text-white p-2 w-full" type="submit">{text}</button>
        </div>
    )
}