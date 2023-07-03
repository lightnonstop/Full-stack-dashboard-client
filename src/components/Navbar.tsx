import { AppBar, Box, Button, IconButton, InputBase, Menu, MenuItem, Toolbar, Typography, useTheme } from "@mui/material"
import { useAppDispatch } from "../app/hook"
import { ArrowDropDownOutlined, DarkModeOutlined, LightModeOutlined, Menu as MenuIcon, Search, SettingsOutlined } from '@mui/icons-material'
import FlexBetween from "./FlexBetween"
import { setMode } from "../state/state"
import { Dispatch, SetStateAction, useState } from "react"
import profile from '../assets/Shelly.jpg'
interface NavbarProps {
    isSidebarOpen: boolean
    setIsSidebarOpen: Dispatch<SetStateAction<boolean>>
    user: {
        name: string
        occupation: string
    } | Record<string, never>
}
function Navbar({ isSidebarOpen, setIsSidebarOpen, user }: NavbarProps) {
    const dispatch = useAppDispatch()
    const theme = useTheme()
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
    const isOpen = Boolean(anchorEl);
    const handleClick = (e) => setAnchorEl(e.currentTarget);
    const handleClose = () => setAnchorEl(null);
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
                        ) : (
                            <LightModeOutlined sx={{ fontSize: '25px' }} />
                        )}
                    </IconButton>
                    <IconButton>
                        <SettingsOutlined sx={{ fontSize: '25px' }} />
                    </IconButton>
                    <FlexBetween>
                        <Button onClick={handleClick} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', textTransform: 'none', gap: '1rem' }}>
                            <Box component='img' alt='profile' src={profile} height='32px' width='32px' borderRadius='50%' sx={{ objectFit: 'cover' }} />
                            <Box textAlign='left'>
                                <Typography fontWeight='bold' fontSize='0.9rem' sx={{ color: theme.palette.secondary[100] }}>
                                    {user?.name}
                                </Typography>
                                <Typography fontSize='0.85rem' sx={{ color: theme.palette.secondary[200] }}>
                                    {user?.occupation}
                                </Typography>
                            </Box>
                            <ArrowDropDownOutlined sx={{ color: theme.palette.secondary[300], fontSize: '2rem' }} />
                        </Button>
                        <Menu anchorEl={anchorEl} open={isOpen} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                            <MenuItem onClick={handleClose}>
                                Log Out
                            </MenuItem>
                        </Menu>
                    </FlexBetween>
                </FlexBetween>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar