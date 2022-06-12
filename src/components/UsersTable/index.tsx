import React, { useState, useEffect } from "react";
import classNames from "classnames";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from '@mui/material/TablePagination';
import Paper from "@material-ui/core/Paper";
import { CircularProgress } from "@material-ui/core";
import { Users, UsersTableProps } from '../../types/interfaces';

const UsersTable = ({isOpen}: UsersTableProps) => {
  const [ users, setUsers ] = useState<Users | undefined>(undefined);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const getUsers = async () => {
    try {
      const response = await fetch('https://wz-server-dio.herokuapp.com/users')
      const json = await response.json()
      setUsers(json)
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    if (users === undefined) {
      getUsers();
    }
  }, [users]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    users === undefined ? <CircularProgress /> : 
    <Paper className={classNames("table-container", {"table-container-collapsed": !isOpen})}>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
              <TableRow>
                <TableCell align="center">Id</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Username</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Phone</TableCell>
              </TableRow>
          </TableHead>
          <TableBody>
            {users && users.data && users.data
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((user) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={user.id}>
                  <TableCell align="center" component="th" scope="row">
                    {user.id}
                  </TableCell>
                  <TableCell align="center">{user.name}</TableCell>
                  <TableCell align="center">{user.username}</TableCell>
                  <TableCell align="center">{user.email}</TableCell>
                  <TableCell align="center">{user.phone}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[2, 5, 10]}
        component="div"
        count={users.data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default UsersTable;