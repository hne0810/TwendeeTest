import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./styles.scss"

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`https://randomuser.me/api/?page=${currentPage}&results=${usersPerPage}&inc=name,email,login,picture,phone`);
        setUsers(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, [currentPage]);

  const totalPages = 10;

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className='container'>
      <h1>Manage Users</h1>
      <table className='tables'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Thumbnail</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: any) => (
            <tr key={user.login.uuid}>
              <td>{`${user.name.first} ${user.name.last}`}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                <img src={user.picture.thumbnail} alt="User Thumbnail" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button 
            className='button'
            key={index + 1} onClick={() => handlePageChange(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default UserList;
