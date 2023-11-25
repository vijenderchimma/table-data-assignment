import './App.css';

import React, { useState, useEffect } from 'react';

const App = () => {
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/v1/users${searchText ? `?searchText=${searchText}` : ''}`);
        const data = await response.json();
        console.log(data)
        setUsers(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [searchText]);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };


  return (
    <div className='main-container'>
      <input type="text" className='search-input' value={searchText} onChange={handleSearch} placeholder="Search by name" />
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>City</th>
            <th>ZipCode</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.address.city}</td>
              <td>{user.address.zipcode}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default App;

