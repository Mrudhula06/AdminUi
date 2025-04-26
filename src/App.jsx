import React, { useEffect, useState } from 'react';
import UserTable from './UserTable.jsx';
import SearchBar from './SearchBar.jsx';
import PaginationControls from './PaginationControls.jsx';
import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [editRowId, setEditRowId] = useState(null);

  const rowsPerPage = 10;

  useEffect(() => {
    fetch(
      'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'
    )
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredUsers = users.filter((user) =>
    Object.values(user).some((val) =>
      val.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);

  const toggleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(currentUsers.map((user) => user.id));
    } else {
      setSelectedRows([]);
    }
  };

  const toggleRowSelection = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handleDeleteSelected = () => {
    setUsers((prev) => prev.filter((user) => !selectedRows.includes(user.id)));
    setSelectedRows([]);
  };

  const handleDeleteRow = (id) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  const handleSaveRow = (id, updatedUser) => {
    setUsers((prev) => prev.map((user) => (user.id === id ? updatedUser : user)));
    setEditRowId(null);
  };

  return (
    <div className="app-container">
      <h1>Admin Dashboard</h1>
      <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
      <UserTable
        users={currentUsers}
        selectedRows={selectedRows}
        toggleSelectAll={toggleSelectAll}
        toggleRowSelection={toggleRowSelection}
        handleDeleteRow={handleDeleteRow}
        handleSaveRow={handleSaveRow}
        editRowId={editRowId}
        setEditRowId={setEditRowId}
      />
      <div className="controls">
        <button className="delete-selected" onClick={handleDeleteSelected}>
          Delete Selected
        </button>
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default App;