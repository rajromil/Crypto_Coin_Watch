import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';

import Header from './components/Header';
import CoinsTable from './components/CoinsTable';
import CoinInfo from './components/CoinInfo';
import TrendingCarousel from './components/TrendingCarousel';
import CryptoContextProvider from './CryptoContext';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#fff' },
    background: {
      default: '#0f2027', 
      paper: '#1a2636',
    },
  },
});

function App() {
  return (
    <BrowserRouter>
      <CryptoContextProvider>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <GlobalStyles
            styles={{
              body: {
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #0f2027 0%, #2c5364 100%)',
                backgroundAttachment: 'fixed',
              },
            }}
          />
          <Header />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <TrendingCarousel />
                  <CoinsTable />
                </>
              }
            />
            <Route path="/coins/:id" element={<CoinInfo />} />
          </Routes>
          <footer
            style={{
              width: "100%",
              textAlign: "center",
              marginTop: "40px",
              padding: "16px 0",
              color: "#bdbdbd",
              fontWeight: "500",
              fontSize: "1rem",
              letterSpacing: "0.5px",
              background: "transparent",
              fontFamily: "Segoe UI, Arial, sans-serif",
            }}
          >
            Project by <span style={{ color: "#FFD700", fontWeight: "bold" }}>ROMIL RAJ</span>
            {" — "}
            <a
              href="mailto:rajromilk23@gmail.com"
              style={{
                color: "#bdbdbd",
                textDecoration: "underline",
                fontWeight: "500",
              }}
            >
              rajromilk23@gmail.com
            </a>
          </footer>
        </ThemeProvider>
      </CryptoContextProvider>
    </BrowserRouter>
  );
}

export default App;