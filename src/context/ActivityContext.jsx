import createDataContext from "./createDataContext";


let initialActivityState = {
    activity1: {title: "Go play football", location: "a football field", type: "sport", price: "20", participants: "8", id: "5454646"},
    activity2: {title: "Do the dishes", location: "the kitchen", type: "chores", price: "0", participants: "1", id: "648642664"},
    activity3: {title: "Finish the front end web assignment", location: "the computer", type: "school", price: "0", participants: "1", id: "5716785467"},
}

const retrieveData = () => {
    let data = localStorage.getItem('activityData')
    if(data){
      initialActivityState = JSON.parse(data)
    }
}

retrieveData()

const activityReducer = (state, { type, payload }) => {

    const activityTitle = payload.activity
    const product = {
        ...payload.product,
    }
    console.log(product)
    // creating an empty object so the activityarray-key can be recreated dynamically by using objectForActivity[activityTitle]
    let objectForActivity = {}

    switch(type){
        case "add": 
        // rewriting the activity by overwriting it
        product["id"] = `${activityTitle}-${state[activityTitle].length + 1}`
        objectForActivity[activityTitle] =  [...state[activityTitle] , {...product}]
        return {...state,  ...activityTitle};
        
        case "delete": 
        objectForActivity[activityTitle] = [...state[activityTitle].filter((el,ind) => (el.id!==product.id))]
        return {...state, ...objectForActivity};

        case "edit":
          console.log("here")
          console.log(payload)
          console.log(activityTitle)
          objectForActivity[activityTitle] = [...state[activityTitle].map((el,ind) => {
                if(el.id===payload.product.id){
                    return payload.product
                }
                return el
            })]
        return {...state, ...objectForActivity}

        default: return state;
    }
}

const addProduct = (dispatch) => {
    return  (object) => {
      try {
          dispatch({ type: "add", payload: object });
      } catch (error) {
        console.log(error);
      }
    };
};

const editProduct = (dispatch) => {
    return  (object) => {
      try {
          dispatch({ type: "edit", payload: object });
      } catch (error) {
        console.log(error);
      }
    };
};

const deleteProduct = (dispatch) => {
    return  (object) => {
      try {
          dispatch({ type: "delete", payload: object });
      } catch (error) {
        console.log(error);
      }
    };
};

export const { Context, Provider } = createDataContext(
    activityReducer,
    { addProduct, deleteProduct, editProduct },
    initialActivityState
);
