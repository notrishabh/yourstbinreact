import counter from './counter';
import getUsers from './getUsers';
import editFormShow from './editFormShow';
import loading from './loading';
import {combineReducers} from 'redux';

const allReducers = combineReducers({
    counter : counter,
    getUsers : getUsers,
    editFormShow : editFormShow,
    loading : loading

});

export default allReducers;