import {Box, Drawer, List, ListItem, ListItemText} from "@mui/material";
import React from "react";
import {useNavigate} from "react-router-dom";

export default function DrawerMenu({drawerOpen, setDrawerOpen, toggleDrawer}) {

    const navigate = useNavigate();

    const menuItems = [
        { text: '홈', path: '/' },
        { text: '대출 이자 계산기', path: '/loan-calc' },
    ];

    const handleMenuClick = (path) => {
        navigate(path);
        setDrawerOpen(false);
    };

    return (
        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
            <Box
                sx={{
                    width: 250,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    bgcolor: '#f5f5f5',
                }}
                role="presentation"
                onClick={toggleDrawer(false)}
                onKeyDown={toggleDrawer(false)}
            >
                <Box
                    sx={{
                        height: 64,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: '#3F51B5',
                        color: '#fff',
                        fontWeight: 'bold',
                        fontSize: '1.2rem',
                    }}
                >
                    메뉴
                </Box>

                <List>
                    {menuItems.map(({ text, path }) => (
                        <ListItem
                            button
                            key={text}
                            onClick={() => handleMenuClick(path)}
                            sx={{
                                cursor: 'pointer',
                                '&:hover': {
                                    backgroundColor: '#e0e0e0',
                                },
                            }}
                        >
                            <ListItemText
                                primary={text}
                                sx={{
                                    fontSize: '1rem',
                                    fontWeight: 500,
                                    color: '#333',
                                }}
                            />
                        </ListItem>
                    ))}
                </List>

                <Box sx={{ mt: 'auto', p: 2, fontSize: '0.8rem', color: '#888' }}>
                    © 2025 Hooni
                </Box>
            </Box>
        </Drawer>
    )
}