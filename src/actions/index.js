import axios from 'axios';
const api = axios.create({
    baseURL :`http://localhost:5000/`
});


export const increment = (nr) =>{
    return{
        type : 'INCREMENT',
        payload : nr

    };
};
export const showEditForm = () =>{
    return{
        type : 'SHOW_FORM',
    };
};
export const hideEditForm = () =>{
    return{
        type : 'HIDE_FORM',
    };
};
export const loadingStart = () =>{
    return{
        type : 'LOADING_START',
    };
};
export const loadingEnd = () =>{
    return{
        type : 'LOADING_END',
    };
};


export const GET_USERS = "GET_USERS";

export const GetUsers = () => {
    return async (dispatch) => {
        await api.get('/fullList')
        .then(res=>{
            const persons = res.data;
            dispatch({
                type: GET_USERS,
                users: persons
            });
        });
    };
};
