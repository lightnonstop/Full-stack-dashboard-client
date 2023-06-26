import { CssBaseline, ThemeProvider } from '@mui/material'
import { createTheme } from '@mui/material'
import { useAppSelector } from 'app/hook'
import { themeSettings } from 'theme'
function App() {
  const mode = useAppSelector((state) => state.global.mode)
  return (
    <>
      
    </>
  )
}

export default App
