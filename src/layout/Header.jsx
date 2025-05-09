import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";
import {
    AppBar,
    Toolbar,
    IconButton,
    Box,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Logo from '@assets/imgs/Hooni_logo.png';
import DrawerMenu from "./DrawerMenu";

export default function Header() {

    const [drawerOpen, setDrawerOpen] = useState(false);
    const navigate = useNavigate();

    const toggleDrawer = (open) => () => {
        setDrawerOpen(open);
    };

    const goHome = () => {
        navigate('/');
    }

    return (
        <>
            <AppBar position="fixed" sx={{ backgroundColor: '#3F51B5' }}>
                <Toolbar sx={{ height: 64 }}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={toggleDrawer(true)}
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Box onClick={goHome} sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                        <img src={Logo} alt="logo" style={{ height: 40, width: 'auto', cursor: 'pointer' }} />
                    </Box>
                </Toolbar>
            </AppBar>

            <Box sx={{ height: 64 }} />

            <DrawerMenu
                drawerOpen={drawerOpen}
                setDrawerOpen={setDrawerOpen}
                toggleDrawer={toggleDrawer}
            />

        </>
    );
}