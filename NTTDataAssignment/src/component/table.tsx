import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Alert from '@mui/material/Alert';
import { Coins } from './interface';
import TableRowComponent from './tableRow';
import axios from 'axios';
import { URLS } from '../config/urls';

const columns = ['', 'Coin Image', 'Coin Name', 'Price', 'Symbol', 'Low Price', 'High Price']; // table header label
const totalCount = 100;

export default function TableComponent() {
  // set the initial values
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [coinsData, setCoinsData] = useState<Coins[]>([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCoinList();   // function call on every page and row per change
  }, [page, rowsPerPage])

  // API call to fetch the coin list
  const fetchCoinList = () => {
    axios.get(`${URLS.coinList}&page=${page}&per_page=${rowsPerPage}`).then(
      (response: any) => {
        setCoinsData(response.data); // set the coin list
      },
      () => {
        setError('Failed to fetch details !! Try after some time.'); // server failure case handler
      },
    )
  }
  // handle the page change
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  }
 // handle the row per change
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  }

  return (
    <Paper className="container" elevation={24}>
      {error ? (
        <div className='alert'>
          <Alert severity='error'>{error}</Alert>
        </div>
      ) : (
        <>
         <div className="heading">Cryptocurrency Market</div>
          <TableContainer>
            <Table stickyHeader aria-label='coin list'>
              <TableHead>
                <TableRow>
                  {columns.map((column, index) => (
                    <TableCell key={index}>{column}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {coinsData.map((row, index) => {
                  return <TableRowComponent key={index} row={row} />
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 20, 30]}
            component='div'
            count={totalCount}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}
    </Paper>
  )
}
