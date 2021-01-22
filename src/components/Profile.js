import React from 'react'

const Profile = ({data}) => {
    const columns = data[0] && Object.keys(data[0]);
    return <table className="table table-sm table-info table-striped">
        <thead>
            <tr>{data[0] && columns.map((heading) => <th key={heading}>{heading}</th>)}</tr>
        </thead>
        <tbody>
            {data.map(row => <tr>
                {
                    columns.map((column) => <td key={column}>{row[column]}</td>)
                }
            </tr>)}
        </tbody>
    </table>
}

export default Profile