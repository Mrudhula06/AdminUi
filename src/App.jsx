import React, { useEffect, useState } from 'react';

const App = () => {
  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState([]);
  const pageSize = 10;

  useEffect(() => {
    fetch(
      'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'
    )
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setFiltered(data);
      });
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const result = users.filter(
      (u) =>
        u.name.toLowerCase().includes(term) ||
        u.email.toLowerCase().includes(term) ||
        u.role.toLowerCase().includes(term)
    );
    setFiltered(result);
    setCurrentPage(1);
  };

  const currentData = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const toggleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(currentData.map((u) => u.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const deleteUser = (id) => {
    const updated = users.filter((u) => u.id !== id);
    setUsers(updated);
    const result = updated.filter(
      (u) =>
        u.name.toLowerCase().includes(searchTerm) ||
        u.email.toLowerCase().includes(searchTerm) ||
        u.role.toLowerCase().includes(searchTerm)
    );
    setFiltered(result);
  };

  const deleteSelected = () => {
    const updated = users.filter((u) => !selectedIds.includes(u.id));
    setUsers(updated);
    const result = updated.filter(
      (u) =>
        u.name.toLowerCase().includes(searchTerm) ||
        u.email.toLowerCase().includes(searchTerm) ||
        u.role.toLowerCase().includes(searchTerm)
    );
    setFiltered(result);
    setSelectedIds([]);
  };

  const totalPages = Math.ceil(filtered.length / pageSize);

  return (
    <div className="app">
      <input
        placeholder="Search by name, email or role"
        className="search-input"
        onChange={handleSearch}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch(e)}
      />

      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                onChange={toggleSelectAll}
                checked={
                  currentData.length > 0 &&
                  currentData.every((u) => selectedIds.includes(u.id))
                }
              />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((user) => (
            <tr
              key={user.id}
              style={{
                backgroundColor: selectedIds.includes(user.id)
                  ? '#f0f0f0'
                  : 'white',
              }}
            >
              <td>
                <input
                  type="checkbox"
                  checked={selectedIds.includes(user.id)}
                  onChange={() => handleSelect(user.id)}
                />
              </td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button className="edit">Edit</button>
                <button className="delete" onClick={() => deleteUser(user.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="controls">
        <button className="first-page" onClick={() => setCurrentPage(1)}>
          First
        </button>
        <button
          className="previous-page"
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
        >
          Prev
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button key={i} onClick={() => setCurrentPage(i + 1)}>
            {i + 1}
          </button>
        ))}
        <button
          className="next-page"
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
        >
          Next
        </button>
        <button className="last-page" onClick={() => setCurrentPage(totalPages)}>
          Last
        </button>
      </div>

      <button onClick={deleteSelected} className="delete-selected">
        Delete Selected
      </button>
    </div>
  );
};

export default App;
