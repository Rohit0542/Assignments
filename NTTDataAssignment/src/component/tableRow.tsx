import React,{ useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';
import TableRow from '@mui/material/TableRow';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress'
import axios from 'axios';
import { URLS } from '../config/urls';
import { Coins } from './interface';

const columns = [
  'Coin Name',
  'Symbol',
  'Hash Code',
  'Genesis Date',
  'Market Cap(EURO)',
  'Homepage Link',
  'Description'
]
interface coinData {
  name: string,
  symbol: string,
  hashing_algorithm: string,
  description: { en: string },
  market_data: { market_cap: { eur: number } },
  genesis_date: string,
  links: { homepage: Array<[]> },
}
export default function TableRowComponent(props: { row: Coins}) {
  const { row } = props;
  // set the initial values
  const [open, setOpen] = useState(false);
  const [cellData, setCellData] = useState<coinData>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // server call to fetch the coin details based on id
  const getCoinDetails = (details: {id: string}) => {
    setOpen(!open);
    setLoading(true);
    if (open === false) {
      axios.get(`${URLS.coinDetails}/${details.id}`)
      .then((response) => {
          setCellData(response?.data); // set the coin details 
          setLoading(false); // stop the progress loader
        },
        () => {
          setError('Failed to fetch Coin details !!') // server failure case handler
        },
      )
    } else {
      setError(''); // resetting the error text 
      setOpen(!open); // collapse the row
    }
  }

  return (
    <React.Fragment>
      <TableRow>
        <TableCell>
          <IconButton id="toggle" aria-label='expand row' size='small' onClick={() => getCoinDetails(row)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component='th' scope='row'>
          <img className="imgSize" src={row.image} />
        </TableCell>
        <TableCell>{row?.name}</TableCell>
        <TableCell>{row?.current_price}</TableCell>
        <TableCell>{row?.symbol}</TableCell>
        <TableCell>{row?.low_24h}</TableCell>
        <TableCell>{row?.high_24h}</TableCell>
      </TableRow>
      {error ? (
        <TableRow>
          <TableCell>
            <Alert id="error" severity='error'>{error}</Alert>
          </TableCell>
        </TableRow>
      ) : (
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
            <Collapse in={open} timeout='auto' unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Table size='small' aria-label='coin details'>
                  <TableHead>
                    <TableRow>
                      {columns.map((column, index) => (
                        <TableCell  key={index}>{column}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {loading ? <TableRow><TableCell><CircularProgress/></TableCell></TableRow> : <TableRow>
                      <TableCell component='th' scope='row'>
                        {cellData?.name}
                      </TableCell>
                      <TableCell>{cellData?.symbol}</TableCell>
                      <TableCell>{cellData?.hashing_algorithm}</TableCell>
                      <TableCell>{cellData?.genesis_date}</TableCell>
                      <TableCell>{cellData?.market_data?.market_cap.eur}</TableCell>
                      <TableCell>{cellData?.links.homepage}</TableCell>
                      <TableCell>{cellData?.description?.en}</TableCell>
                    </TableRow>}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </React.Fragment>
  )
}
