import { AppBar, IconButton, InputBase, Toolbar, useTheme } from "@mui/material"
import { useAppDispatch } from "../app/hook"
import { DarkModeOutlined, LightModeOutlined, Menu as MenuIcon, Search, SettingsOutlined } from '@mui/icons-material'
import FlexBetween from "./FlexBetween"
import { setMode } from "../state/state"
interface NavbarProps{
    isSidebarOpen: boolean
    setIsSidebarOpen: Dispatch<SetStateAction<boolean>>
}
function Navbar({ isSidebarOpen, setIsSidebarOpen }: NavbarProps) {
    const dispatch = useAppDispatch()
    const theme = useTheme()
  return (
    <AppBar sx={{ position: 'static', background: 'none', boxShadow: 'none' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
            <FlexBetween>
                <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <MenuIcon />
                </IconButton>
                <FlexBetween backgroundColor={theme.palette.background.alt}
                borderRadius='9px'
                gap='3rem'
                p='0.1rem 1.5rem'
                >
                    <InputBase placeholder='Search...' />
                    <IconButton>
                        <Search />
                    </IconButton>
                </FlexBetween>
            </FlexBetween>

            <FlexBetween gap='1.5rem'>
                <IconButton onClick={() => dispatch(setMode())}>
                    {theme.palette.mode === 'dark' ? (
                        <DarkModeOutlined sx={{ fontSize: '25px' }} />
                    ): (
                        <LightModeOutlined sx={{ fontSize: '25px' }} />
                    )}
                </IconButton>
                <IconButton>
                    <SettingsOutlined sx={{ fontSize: '25px' }} />
                </IconButton>
            </FlexBetween>
        </Toolbar>
    </AppBar>
  )
}

export default Navbar