import React,{useState} from 'react';

const Pagination = ({rowsPerPage, totalRows, paginate, currentPage}) => {
    const pageNumbers = [];

    for(let i=1; i<= Math.ceil(totalRows/rowsPerPage); i++) {
        pageNumbers.push(i);
    }
    const [pageRange, setPageRange] = useState([1,2,3,4,5]);

    const handleAnchor = (e,number) => {
        e.preventDefault();
        if(number > 0 && number <= pageNumbers.length){
            paginate(number);
        }
        if(number === pageRange[pageRange.length - 1]){
            setPageRange(pageNumbers.slice(pageRange[0],number+1));
        }else if(number === pageRange[0] && number > 1){
            setPageRange(pageNumbers.slice(pageRange[0]-2,pageRange[pageRange.length-1]-1));
        }
    };
    return(
        <nav>
            <ul className="pagination justify-content-end">
                <li key="prev" className="page-item">
                    <button onClick={(e)=>handleAnchor(e,currentPage-1)} className="page-link">Previous</button>
                </li>
                {pageRange.map(number => (
                    <li key={number} className = {number === currentPage ? 'page-item active' : 'page-item'}
                    >
                        <button 
                            onClick={(e)=>handleAnchor(e,number)}  
                            className="page-link"
                            >
                                {number}
                        </button>
                    </li>
                ))}
                <li key="next" className="page-item">
                    <button onClick={(e)=>handleAnchor(e,currentPage+1)} className="page-link">Next</button>
                </li>
            </ul>
        </nav>
    );
};
export default Pagination;