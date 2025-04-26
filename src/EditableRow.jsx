import React, { useState } from 'react';

const EditableRow = ({ user, handleSaveRow }) => {
  const [formData, setFormData] = useState({ ...user });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <tr>
      <td></td>
      <td>
        <input name="name" value={formData.name} onChange={handleChange} />
      </td>
      <td>
        <input name="email" value={formData.email} onChange={handleChange} />
      </td>
      <td>
        <input name="role" value={formData.role} onChange={handleChange} />
      </td>
      <td>
        <button className="save" onClick={() => handleSaveRow(user.id, formData)}>
          Save
        </button>
      </td>
    </tr>
  );
};

export default EditableRow;
