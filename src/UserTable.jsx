import React from 'react';
import EditableRow from './EditableRow';
import ReadOnlyRow from './ReadOnlyRow';

const UserTable = ({
  users,
  selectedRows,
  toggleSelectAll,
  toggleRowSelection,
  handleDeleteRow,
  handleSaveRow,
  editRowId,
  setEditRowId,
}) => {
  return (
    <table className="user-table">
      <thead>
        <tr>
          <th>
            <input
              type="checkbox"
              onChange={toggleSelectAll}
              checked={users.every((user) => selectedRows.includes(user.id))}
            />
          </th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) =>
          editRowId === user.id ? (
            <EditableRow
              key={user.id}
              user={user}
              handleSaveRow={handleSaveRow}
            />
          ) : (
            <ReadOnlyRow
              key={user.id}
              user={user}
              isSelected={selectedRows.includes(user.id)}
              toggleRowSelection={toggleRowSelection}
              onDelete={handleDeleteRow}
              onEdit={() => setEditRowId(user.id)}
            />
          )
        )}
      </tbody>
    </table>
  );
};

export default UserTable;