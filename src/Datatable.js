import React from 'react';

export default function Datatable({data,columns}){
    // const columns = data[0] && Object.keys(data[0]);

    const convertDate = (dater) => {
        if(dater !== "0000-00-00 00:00:00"){
            var dt = new Date(dater).toString().split('00:00:00')[0];
            return dt;
        }
    }


    return(
        <div className="table-responsive">
            <table className="table mt-3">
                <thead className="table-primary">
                    <tr>{data[0] && columns.map((heading) => <th key={heading}>{heading}</th>)}</tr>
                </thead>
                <tbody>
                    {data.map((row) =>{
                        row.datePaid = convertDate(row.datePaid);
                        if(row.datePaid === undefined){
                            row.datePaid = "0000-00-00 00:00:00";
                        }
                        row.dateExpiry = convertDate(row.dateExpiry);
                        if(row.dateExpiry === undefined){
                            row.dateExpiry = "0000-00-00 00:00:00";
                        }
                        // row.Edit = <button onClick={()=>handleClick(row)}>xdd</button>

                        return(
                            <tr key={row.id}>
                            {
                                columns.map(column=>
                                    <td>
                                        {row[column]}
                                    </td>)
                            }
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}