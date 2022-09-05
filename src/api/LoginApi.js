import axios from "axios";

const mockServer = axios.create({
    // port 3000 already in use
    baseURL: process.env.REACT_APP_BACKEND_BASE_URL || 'http://localhost:3001'
})

mockServer.defaults.headers.get["Content-Type"] = "application/json"

export const login = async(credentails) => {
    try{
        const response = await mockServer.get("/login",credentails)
        return response.data 
    }catch(e){
        throw new Error("An error occured while trying to connect to the server!")
    }
};

export const register = async(credentails) => {
    try{
        const response = await mockServer.post("/register",credentails)
        return response.data 
    }catch(e){

    }
}