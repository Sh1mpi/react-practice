import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Main from '../../pages/Main';
import Trade from '../../pages/Trade';
import Wallet from '../../pages/Wallet';
import Profile from '../../pages/Profile';
import { MAIN_ROUTE, TRADE_ROUTE, WALLET_ROUTE, PROFILE_ROUTE } from '../../routes/config';

const Navigation: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuth = () => {
    setIsAuthenticated(!isAuthenticated);
  };

  return (
    <>
      <nav style={{ backgroundColor: '#f0f0f0', padding: '10px', marginBottom: '20px' }}>
        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', justifyContent: 'space-around' }}>
          <li>
            <Link to={MAIN_ROUTE} style={{ textDecoration: 'none', color: 'black' }}>Main</Link>
          </li>
          {isAuthenticated && (
            <>
              <li>
                <Link to={TRADE_ROUTE} style={{ textDecoration: 'none', color: 'black' }}>Trade</Link>
              </li>
              <li>
                <Link to={WALLET_ROUTE} style={{ textDecoration: 'none', color: 'black' }}>Wallet</Link>
              </li>
              <li>
                <Link to={PROFILE_ROUTE} style={{ textDecoration: 'none', color: 'black' }}>Profile</Link>
              </li>
            </>
          )}
        </ul>
        <button onClick={handleAuth} style={{ padding: '5px 10px', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px' }}>
          {isAuthenticated ? 'Выйти' : 'Войти'}
        </button>
      </nav>

      <Routes>
        <Route path={MAIN_ROUTE} element={<Main />} />
        {isAuthenticated && (
          <>
            <Route path={TRADE_ROUTE} element={<Trade />} />
            <Route path={WALLET_ROUTE} element={<Wallet />} />
            <Route path={PROFILE_ROUTE} element={<Profile />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default Navigation;
