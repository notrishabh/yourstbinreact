import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {hideEditForm, GetUsers, loadingStart, loadingEnd} from './actions';
import {useDispatch} from 'react-redux';

const api = axios.create({
    baseURL :`http://localhost:5000/`
});


const EditForm = ({row}) => {
    const [data,setData] = useState({});
    const dispatch = useDispatch();

    useEffect(()=>{
        setData(row);
    },[row]);

    const valueChange = (e) => {
        let ids = e.target.name;
        let change = e.target.value;
        setData({...data, [ids] : change});
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(loadingStart());
        const values = {
            Name : data.Name,
            Address : data.Address,
            Stb : data.Stb,
            Mobile : data.Mobile
        };
        await api.put(`/editRecord/${data.cid}`,values)
        .then(dispatch(hideEditForm()))
        .then(dispatch(GetUsers()))
        .then(dispatch(loadingEnd()))
    }
    return(
        <div className="card mb-4 shadow">
            <h5 className="card-header">Customer Edit</h5>
            <div className="card-body">
            <form onSubmit={(e)=>handleSubmit(e)}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" name="Name" value={data.Name} onChange={(e)=>valueChange(e)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Address</label>
                    <input type="text" className="form-control" name="Address" value={data.Address} onChange={(e)=>valueChange(e)}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Stb</label>
                    <input type="text" className="form-control" name="Stb" value={data.Stb} onChange={(e)=>valueChange(e)}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Mobile</label>
                    <input type="text" className="form-control" name="Mobile" value={data.Mobile} onChange={(e)=>valueChange(e)}/>
                </div>
                <input className="btn btn-primary" type="submit" value="Save" />
            </form>
            </div>
        </div>

    );
};

export default EditForm;