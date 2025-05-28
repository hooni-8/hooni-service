import React from 'react';
import '@styles/Home.scss';
import { Box, Typography, Button, Paper, Stack } from '@mui/material';
import {useNavigate} from "react-router-dom";
import Logo from '@assets/imgs/Hooni_logo.png';
import * as path from "@components/utils/Path";

export default function Home() {
    const navigate = useNavigate();
    const menuItems = [
        { text: '만기상환 이자 계산기', path: path.Expiration, variant: 'outlined'},
        { text: '원리금 균등상환 계산기', path: path.Evenness, variant: 'contained'},
    ];

    return (
        <Box className='background-container'>
            <Paper elevation={6} sx={{ padding: 6, borderRadius: 4, maxWidth: 400, boxSizing: 'border-box' }}>
                <Stack spacing={3} alignItems="center">
                    <img src={Logo} alt="logo" className="logo"/>
                    <Typography variant="h5" fontWeight="bold">
                        Hooni의 Service!
                    </Typography>
                    <Typography variant="body1" align="center">
                        개인적으로 필요한 서비스를 모음
                    </Typography>

                    <Stack spacing={1} width="100%" sx={{mt: 2}}>
                        {menuItems.map((item) => (
                            <Button
                                key={item.text}
                                variant={item.variant}
                                fullWidth
                                onClick={() => navigate(item.path)}
                                sx={{borderRadius: 3}}
                            >
                                {item.text}
                            </Button>
                        ))}
                    </Stack>
                </Stack>
            </Paper>
        </Box>
    );
}