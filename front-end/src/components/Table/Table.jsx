import React from 'react';
import TableBody from './../TableBody';
import TableHeader from './../TableHeader';

const Table = ({ columns, onSort, sort, data }) => {
  return (
    <table className="table">
      <TableHeader columns={columns} sort={sort} onSort={onSort} />
      <TableBody data={data} columns={columns} />
    </table>
  );
};

export default Table;
