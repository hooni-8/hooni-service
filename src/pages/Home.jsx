import React from 'react';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Box, Typography, Button, Paper, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import {useNavigate} from "react-router-dom";

const CenteredContainer = styled(Box)(({ theme }) => ({
    height: 'calc(100vh - 64px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(to right, #e3f2fd, #bbdefb)',
}));

export default function Home() {
    const navigate = useNavigate();
    const menuItems = [
        { text: '대출 이자 계산기', path: '/loan-calc', variant: 'outlined'},
        { text: '버튼 색상 용', path: '/loan-calc', variant: 'contained'},
    ];

    return (
        <CenteredContainer>
            <Paper elevation={6} sx={{ padding: 6, borderRadius: 4, maxWidth: 400, boxSizing: 'border-box' }}>
                <Stack spacing={3} alignItems="center">
                    <CheckCircleOutlineIcon sx={{ fontSize: 60, color: 'success.main' }} />
                    <Typography variant="h5" fontWeight="bold">
                        Hooni의 Service!
                    </Typography>
                    <Typography variant="body1" align="center">
                        개인적으로 필요한 서비스를 모음
                    </Typography>

                    <Stack spacing={1} width="100%" sx={{ mt: 2 }}>
                        {menuItems.map((item) => (
                            <Button
                                key={item.text}
                                variant={item.variant}
                                fullWidth
                                onClick={() => navigate(item.path)}
                                sx={{ borderRadius: 3 }}
                            >
                                {item.text}
                            </Button>
                        ))}
                    </Stack>
                </Stack>
            </Paper>
        </CenteredContainer>
    );
}