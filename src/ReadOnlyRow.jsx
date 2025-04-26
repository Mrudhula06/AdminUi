import React from 'react';

const ReadOnlyRow = ({ user, isSelected, toggleRowSelection, onDelete, onEdit }) => {
  return (
    <tr className={isSelected ? 'selected-row' : ''}>
      <td>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => toggleRowSelection(user.id)}
        />
      </td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.role}</td>
      <td>
        <button className="edit" onClick={onEdit}>Edit</button>
        <button className="delete" onClick={() => onDelete(user.id)}>Delete</button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
