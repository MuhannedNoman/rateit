import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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

  const renderSortIcon = (column) => {
    if (column.path !== sort.path) return null;

    if (sort.order === 'asc')
      return <FontAwesomeIcon icon={['fas', 'sort-up']} />;

    return <FontAwesomeIcon icon={['fas', 'sort-down']} />;
  };

  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <th
            role="button"
            key={column.path || column.key}
            onClick={() => raiseSort(column.path)}
          >
            {column.label}
            {renderSortIcon(column)}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
