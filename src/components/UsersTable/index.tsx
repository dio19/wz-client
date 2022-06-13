import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { 
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { Users, TableProps, MouseEventButton } from '../../types/interfaces';

const UsersTable = ({isOpen}: TableProps) => {
  const [ users, setUsers ] = useState<Users | undefined>(undefined);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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

  const navigate = useNavigate();
  const handleNavigate = (id: string) => navigate(`/users/${id}`);

  const handleGetDetail = (e: MouseEventButton) => {
    e.preventDefault()
    const idString = e.target.id
    handleNavigate(idString)
  };

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
                  <TableCell align="center">Actions</TableCell>
              </TableRow>
          </TableHead>
          <TableBody>
            {users && users.data && users.data
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((user) => {
              return (
                <TableRow hover tabIndex={-1} key={user.id}>
                  <TableCell align="center" component="th" scope="row">
                    {user.id}
                  </TableCell>
                  <TableCell align="center">{user.name}</TableCell>
                  <TableCell align="center">{user.username}</TableCell>
                  <TableCell align="center">{user.email}</TableCell>
                  <TableCell align="center">{user.phone}</TableCell>
                  <TableCell align="center"><button className="table-container__button" id={user.id.toString()} onClick={handleGetDetail}>Detail</button></TableCell>
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