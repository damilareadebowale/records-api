import React, {useState, useEffect} from 'react';
import Profile from './components/Profile';
import Pagination from './components/Pagination';
import axios from 'axios';
import './App.css';

const App = () => {
  const [data, setData] = useState([]);
  const [q, setQ] = useState('');
  const [searchColumns, setSearchColumns] = useState(["FirstName", "LastName"]);
  const [currentPage, setCurrentPage] = useState(1);
  const [profilePerPage] = useState(20);
  
  useEffect(() => {
    const fetchProfile = async () => {
      const res = await axios.get('https://api.enye.tech/v1/challenge/records');
      setData(res.data.records.profiles);
    }
    fetchProfile();
  }, []);

  // Get current profile
  const indexOfLastProfile = currentPage * profilePerPage;
  const indexOfFirstProfile = indexOfLastProfile - profilePerPage;
  const currentProfile = data.slice(indexOfFirstProfile, indexOfLastProfile);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const search = (rows) => {
    return rows.filter((row) => searchColumns.some(
      (column) => row[column].toString().toLowerCase().indexOf(q.toLowerCase()) > -1));
  }

  // console.log(data);
  const columns = data[0] && Object.keys(data[0]);
  return (
    <div className="ms-4">
      <h1 className="text-primary mb-1">Profile Details</h1>
      <input type="text" value={q} onChange={(e) => setQ(e.target.value)} />
      <br/>
      {
        columns && columns.map((column) => <label key={column}>
          <input type="checkbox" checked={searchColumns.includes(column)}
            onChange={(e) => {
              const checked = searchColumns.includes(column)
              setSearchColumns(prev => checked 
                ? prev.filter((sc) => sc !== column)
                : [...prev, column]);
            }}
          />
          {column} 
        </label>)
      }
      <Profile data={search(currentProfile)} />
      <Pagination profilePerPage={profilePerPage} totalProfile={data.length} paginate={paginate}/>
    </div>
  );
}

export default App;
