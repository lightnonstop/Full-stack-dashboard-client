import { CssBaseline, ThemeProvider } from '@mui/material'
import { createTheme } from '@mui/material'
import { useMemo } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useAppSelector } from './app/hook'
import { themeSettings } from './theme'
import Dashboard from './scenes/dashboard/Dashboard'
import Layout from './scenes/layout/Layout'
import Products from './scenes/products/Products'
import Customers from './scenes/customers/Customers'
import Transactions from './scenes/transactions/Transactions'
import Geography from './scenes/geography/Geography'
import Overview from './scenes/overview/Overview'
import Daily from './scenes/daily/Daily'
import Monthly from './scenes/monthly/Monthly'
import Breakdown from './scenes/breakdown/Breakdown'
import Admin from './scenes/admin/Admin'
import Performance from './scenes/performance/Performance'
function App() {
  const mode = useAppSelector((state) => state.global.mode)
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])
  return <div>
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <Routes>
            <Route element={<Layout />}>
              <Route path='/' element={<Navigate to='/dashboard' replace />} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/products' element={<Products />} />
              <Route path='/customers' element={<Customers />} />
              <Route path='/transactions' element={<Transactions />} />
              <Route path='/geography' element={<Geography />} />
              <Route path='/overview' element={<Overview />} />
              <Route path='/daily' element={<Daily />} />
              <Route path='/monthly' element={<Monthly />} />
              <Route path='/breakdown' element={<Breakdown />} />
              <Route path='/admin' element={<Admin />} />
              <Route path='/performance' element={<Performance />} />
            </Route>
          </Routes>
        </CssBaseline>
      </ThemeProvider>
    </Router>
  </div>
}

export default App
