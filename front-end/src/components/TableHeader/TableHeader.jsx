import React from 'react';

const TableHeader = ({ columns, sort, onSort }) => {
  const raiseSort = (path) => {
    const newSort = { ...sort };
    if (newSort.path === path)
      newSort.order = newSort.order === 'asc' ? 'desc' : 'asc';
    else {
      newSort.path = path;
      newSort.order = 'asc';
    }
    onSort(newSort);
  };

  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <th
            key={column.path || column.key}
            onClick={() => raiseSort(column.path)}
          >
            {column.label}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
