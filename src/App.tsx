import { CssBaseline, ThemeProvider } from '@mui/material'
import { createTheme } from '@mui/material'
import { useMemo } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useAppSelector } from './app/hook'
import { themeSettings } from './theme'
import Dashboard from './scenes/dashboard/Dashboard'
import Layout from './scenes/layout/Layout'
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

            </Route>
          </Routes>
        </CssBaseline>
      </ThemeProvider>
    </Router>
  </div>
}

export default App
