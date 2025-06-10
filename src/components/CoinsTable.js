import React, { useState, useEffect } from 'react';
import {
  TableContainer,
  LinearProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography,
  TextField,
  Pagination,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';
import axios from 'axios';

const useStyles = {
  row: {
    backgroundColor: '#16171a',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#131111',
    },
    fontFamily: 'Montserrat',
  },
  pagination: {
    padding: 20,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
};

const CoinsTable = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const { currency, symbol, coins, loading } = CryptoState();

  const handleSearch = () =>
    coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );

  // No fetch here – coins come from context; see CryptoContext.js

  useEffect(() => {
    setPage(1);
  }, [search]);

  return (
    <TableContainer component={Paper}>
      <Typography
        variant="h4"
        style={{ margin: 18, fontFamily: 'Montserrat' }}
        align="center"
      >
        Cryptocurrency Prices by Market Cap
      </Typography>
      <TextField
        label="Search For a Crypto Currency.."
        variant="outlined"
        fullWidth
        style={{ marginBottom: 20 }}
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
      />

      {loading ? (
        <LinearProgress style={{ backgroundColor: 'gold' }} />
      ) : (
        <Table aria-label="simple table">
          <TableHead style={{ backgroundColor: '#EEBC1D' }}>
            <TableRow>
              {['Coin', 'Price', '24h Change', 'Market Cap'].map((head) => (
                <TableCell
                  key={head}
                  align={head === 'Coin' ? 'left' : 'right'}
                  style={{
                    color: 'black',
                    fontWeight: '700',
                    fontFamily: 'Montserrat',
                  }}
                >
                  {head}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {handleSearch()
              .slice((page - 1) * 10, (page - 1) * 10 + 10)
              .map((row) => {
                const profit = row.price_change_percentage_24h > 0;
                return (
                  <TableRow
                    style={useStyles.row}
                    key={row.name}
                    onClick={() => navigate(`/coins/${row.id}`)}
                  >
                    <TableCell component="th" scope="row" style={{ display: 'flex', gap: 15 }}>
                      <img src={row.image} alt={row.name} height="50" style={{ marginBottom: 10 }} />
                      <div>
                        <span style={{ textTransform: 'uppercase', fontSize: 22 }}>{row.symbol}</span>
                        <span style={{ color: 'darkgrey' }}>{row.name}</span>
                      </div>
                    </TableCell>
                    <TableCell align="right">
                      {symbol}
                      {row.current_price.toLocaleString()}
                    </TableCell>
                    <TableCell
                      align="right"
                      style={{
                        color: profit ? 'rgb(14, 203, 129)' : 'red',
                        fontWeight: 500,
                      }}
                    >
                      {profit && '+'}
                      {row.price_change_percentage_24h.toFixed(2)}%
                    </TableCell>
                    <TableCell align="right">
                      {symbol}
                      {row.market_cap.toLocaleString().slice(0, -6)}M
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      )}

      <Pagination
        count={Math.ceil(handleSearch().length / 10)}
        style={useStyles.pagination}
        onChange={(_, value) => {
          setPage(value);
          window.scroll(0, 450);
        }}
      />
    </TableContainer>
  );
};

export default CoinsTable;
