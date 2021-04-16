import {GET_USERS} from '../actions';

const INITIAL_STATE = {
    Users : [],
};

export default (state = INITIAL_STATE, action)=>{
    switch(action.type){
        case GET_USERS : {
            return{
                ...state,
                Users:action.users
            };
        }
        default: {
            return state;
        }
    }
};