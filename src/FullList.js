import React,{useState,useEffect} from 'react';
import Datatable from './Datatable';
import Pagination from './Pagination';
import {useSelector, useDispatch} from 'react-redux';
import {GetUsers, showEditForm} from './actions';
import EditForm from './EditForm';

export default function FullList(){
    const [q,setq] = useState("");  //SEARCH QUERY
    const [searchColumns, setSeachColumns] = useState(["Name", "Address"]); //DO SEARCH ON THESE COLUMNS
    const [currentPage, setCurrentPage] = useState(1); //PAGINATION PAGE
    const [rowsPerPage,setRowsPerPage] = useState(5); //NO OF ROWS PER PAGE
    const [showFilter, setShowFilter] = useState(false); //SHOW COLUMNS TO SEARCH ON
    const [editRow, setEditRow] = useState({});


    //REDUX-THUNK START

    const data = useSelector(state=>state.getUsers.Users);
    const editFormShow = useSelector(state=>state.editFormShow);
    const loading = useSelector(state=>state.loading);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(GetUsers());
        console.log("xddd");
        console.log(loading);
    },[loading, dispatch]);

    //REDUX-THUNK END

    //ADDITIONAL FEATURES IN DATATABLE START
    const edit = (row)=>{
        setEditRow(row);
        dispatch(showEditForm());

    };
    data.map((one)=>{
        one.Edit = <button onClick={()=>edit(one)}>Edit</button>
    });

    //ADDITIONAL FEATURES IN DATATABLE END

    //SEARCH BAR
    const search =(rows)=>{
        return rows.filter(
            (row)=>
               searchColumns.some(
                (column)=>
                    row[column].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
                )
        );
    }

    const rowsArray = [5,10,25,50]; //NO. OF ROWS ON PAGE DROPDOWN

    //PAGINATION START
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    //PAGINATION END

    // const columns = data[0] && Object.keys(data[0]);

    const columnss = ["cid", "Name", "Address", "Stb", "datePaid", "dateExpiry", "Edit"];  //COLUMNS TO SEND TO DATATABLE
    const filterColumnss = ["cid", "Name", "Address", "Stb", "datePaid", "dateExpiry"]; //COLUMNS FOR DOING SEARCH ON

    return(
        <div className="container">
            <div style={editFormShow ? {display:"block"} : {display:"none"}}>
                <EditForm row={editRow}/>
            </div>
            {/* SEARCH BAR, FILTER BUTTON AND ROWS DROPDOWN START */}
            <div className="row align-items-center">  
                <div className = "col-md-3 me-5">
                    <input className="form-control" type="text" value={q} onChange={(e) => setq(e.target.value)}  placeholder="Search"/>
                </div>
                <button className="col-md-1 btn btn-primary" onClick={()=>{setShowFilter(!showFilter)}}>Filter</button>
                <div className="col-md-1 offset-md-6 dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        Rows
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        {rowsArray.map((row)=>
                            <li key={row}><button className="dropdown-item" type="button" onClick={()=>{
                                setRowsPerPage(row)
                            }} >{row}</button></li>
                        )}
                    </ul>
                </div>
            </div>
            {/* SEARCH BAR, FILTER BUTTON AND ROWS DROPDOWN END */}

            {/* COLUMNS FILTER TO SEARCH ON START */}
                <div style={showFilter ? {display:"block"} : {display:"none"}}>
                    {filterColumnss && filterColumnss.map((column)=>
                    <label key={column} className="col-md-2 mt-2">
                        <input className="form-check-input me-1" type="checkbox" checked={searchColumns.includes(column)} onChange={(e)=>{
                            const checked  =searchColumns.includes(column);
                            setSeachColumns(prev=>checked ? prev.filter(sc => sc !== column) : [...prev, column] )
                        }}/>
                        {column}
                    </label>)}
                </div>
            {/* COLUMNS FILTER TO SEARCH ON END */}

            {/* DATATABLE WITH PAGINATION START */}
            <div>
                <Datatable 
                    data={q ? search(data) : currentRows} 
                    columns={columnss}
                />
                <Pagination 
                    rowsPerPage ={rowsPerPage} 
                    totalRows={data.length} 
                    paginate={paginate}
                    currentPage={currentPage}
                />
                {/* {fetchUsers.length ? 
                    fetchUsers.slice(0,10).map((lol)=>{
                        return(
                            <li>{lol.Name}</li>
                        );
                    }) : 'Loading'
                } */}
            </div>
            {/* DATATABLE WITH PAGINATION END */}
        </div>
    );
}

