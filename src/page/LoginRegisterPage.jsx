import Login from "../components/Login";
import Register from "../components/Register";

export default function LoginRegisterPage () {

    return(
        <div className="=container mx-auto h-screen grid grid-cols-1 sm:grid-cols-2 mt-8">
            <div className="grid-cols-1 flex flex-col items-center"> 
                <Login/>
            </div>

            <div className="grid-cols-2 flex flex-col items-center">
                <Register/>
            </div>
        </div>
    )

}