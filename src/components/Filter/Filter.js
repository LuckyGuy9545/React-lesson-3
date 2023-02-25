import React from 'react';

//==чтобы достучаться до value и onChange, используем пропсы
const Filter = ({ value, onChange }) => (
  <label>
    Filter by name
    <input type="text" value={value} onChange={onChange} />
  </label>
);

export default Filter;
