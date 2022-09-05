import createDataContext from "./createDataContext";

const initialUserState = {
    username:"",
    token:""
}

const userReducer = (state, { type, payload }) => {

    switch(type){
        case "login": return {...state,username:payload.username, token:payload.token};
        case "logout" : return {username:"",token:""};
        default : return state;
    }

}
const loginUser = (dispatch) => {
    return  (object) => {
      try {
        dispatch({ type: "login", payload: object });
      } catch (error) {
        console.log(error);
      }
    };
};

const logoutUser = (dispatch) => {
    return  () => {
      try {
          dispatch({ type: "logout" });
      } catch (error) {
        console.log(error);
      }
    };
};

export const { Context, Provider } = createDataContext(
    userReducer,
    { loginUser,logoutUser },
    initialUserState 
);