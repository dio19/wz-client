import React, { useState, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { 
    Paper,
    TableBody,
    TableRow,
    TableCell,
    Toolbar,
    InputAdornment,
    Table,
    TableHead,
    TableSortLabel,
    TextField,
    TablePagination,
    CircularProgress,
    TableContainer,
    FormControlLabel,
    Switch
  } from '@material-ui/core';
import { Search } from "@material-ui/icons";
import classNames from "classnames";
import { DataTask, HeadCell, TableProps } from "../../types/interfaces";
import { Order } from "../../types/types";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (a: { [key in Key]: number | string | boolean }, b: { [key in Key]: number | string | boolean}) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells: HeadCell[] = [
    { id: 'id', label: 'Id', disableSorting: false },
    { id: 'title', label: 'Title', disableSorting: false },
    { id: 'user_id', label: 'User Id', disableSorting: false },
    { id: 'completed', label: 'Completed (state)', disableSorting: true  },
]

interface EnhancedTableProps {
  classes: ReturnType<typeof useStyles>;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof DataTask) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property: keyof DataTask) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.disableSorting ? headCell.label :
                <TableSortLabel
                    active={orderBy === headCell.id}
                    direction={orderBy === headCell.id ? order : 'asc'}
                    onClick={createSortHandler(headCell.id)}
                >
                    {headCell.label}
                    {orderBy === headCell.id ? (
                    <span className={classes.visuallyHidden}>
                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </span>
                    ) : null}
                </TableSortLabel>
            }
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
  }),
);

export default function EnhancedTable({isOpen}: TableProps) {
  const classes = useStyles();
  const [rows, setRows] = useState<DataTask[] | undefined>(undefined);
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof DataTask>('title');
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [query, setQuery] = useState("")

  const getTasks = async () => {
    try {
      const response = await fetch('https://wz-server-dio.herokuapp.com/tasks')
      const json = await response.json()
      setRows(json.data)
    } catch (e) {
      console.error(e);
    }
  }

  const getTasksByQuery = async (value:string) => {
    try {
      const response = await fetch(`https://wz-server-dio.herokuapp.com/tasks?title=${value}`)
      const json = await response.json()
      setRows(json.data)
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    if (rows === undefined) {
      getTasks();
    }

  }, [rows]);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof DataTask) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value !== "") {
      getTasksByQuery(value)
    }
    if (value === "") {
      console.log("entre")
      getTasks()
    }
  };

  const emptyRows = rows === undefined ? 0 : rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classNames("table-container", {"table-container-collapsed": !isOpen})}>
        {rows === undefined ? <CircularProgress /> : (
                  <Paper className={classes.paper}>
                  <Toolbar>
                      <TextField
                          variant="outlined"
                          label="Search Tasks"
                          InputProps={{
                              startAdornment: (<InputAdornment position="start">
                                  <Search />
                              </InputAdornment>)
                          }}
                          onChange={handleSearch}
                      />
                  </Toolbar>
                  <TableContainer>
                    <Table
                      className={classes.table}
                      aria-labelledby="tableTitle"
                      size={dense ? 'small' : 'medium'}
                      aria-label="enhanced table"
                    >
                      <EnhancedTableHead
                        classes={classes}
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                        rowCount={rows.length}
                      />
                      <TableBody>
                        {stableSort(rows, getComparator(order, orderBy))
                          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          .map((row, index) => {
                            return (
                              <TableRow
                                key={index}
                              >
                                <TableCell>{row.id}</TableCell>
                                <TableCell>{row.title}</TableCell>
                                <TableCell>{row.user_id}</TableCell>
                                <TableCell>{row.completed.toString()}</TableCell>
                              </TableRow>
                            );
                          })}
                        {emptyRows > 0 && (
                          <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                            <TableCell colSpan={6} />
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </Paper>
        )}
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </div>
  );
}