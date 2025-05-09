import { useState } from "react";
import {
    Box,
    Button,
    Container,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Typography,
    Paper,
    TableContainer,
} from "@mui/material";
import { styled } from '@mui/material/styles';

// 배경 스타일 추가
const BackgroundContainer = styled(Box)(({ theme }) => ({
    minHeight: 'calc(100vh - 64px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(to right, #e3f2fd, #bbdefb)', // 그라디언트 배경
    padding: '16px',
    boxSizing: 'border-box',
}));

export default function Loancalc() {
    const [principal, setPrincipal] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [year, setYear] = useState(new Date().getFullYear());
    const [results, setResults] = useState([]);

    const parseNumber = (formatted) => formatted.replace(/,/g, '');
    const formatNumber = (value) => {
        if (!value && value !== 0) return '';
        return Number(value).toLocaleString('ko-KR');
    };

    const handlePrincipalChange = (e) => {
        const numberOnly = e.target.value.replace(/[^0-9]/g, '');
        setPrincipal(formatNumber(numberOnly));
    };

    const calculateInterest = () => {
        const maxAmount = parseInt(parseNumber(principal), 10);
        const rate = parseFloat(interestRate) / 100;

        if (!maxAmount || !rate) {
            alert("대출금과 이자율을 정확히 입력해주세요.");
            return;
        }

        const rows = [];
        for (let amount = maxAmount; amount >= 1000000; amount -= 1000000) {
            const totalInterest = amount * rate;
            const dailyInterest = totalInterest / 365;

            rows.push({
                amount,
                totalInterest,
                monthlyInterests: getMonthlyInterests(dailyInterest, year),
            });
        }

        setResults(rows);
    };

    const getMonthlyInterests = (dailyInterest, year) => {
        const monthEndDays = Array.from({ length: 12 }, (_, month) => {
            const date = new Date(year, month + 1, 0);
            return date.getDate();
        });

        return monthEndDays.map((days) =>
            Math.floor(dailyInterest * days)
        );
    };

    return (
        <BackgroundContainer>
            <Container maxWidth="xl" disableGutters>
                <Typography variant="h4" gutterBottom align="center" sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}>
                    💰 만기일시상환 이자 계산기
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, mb: 3 }}>
                    <TextField
                        label="대출금 (₩)"
                        variant="outlined"
                        value={principal}
                        onChange={handlePrincipalChange}
                        fullWidth
                        margin="normal"
                        sx={{ mb: { xs: 2, sm: 0 } }}
                    />
                    <TextField
                        label="연 이자율 (%)"
                        variant="outlined"
                        type="number"
                        value={interestRate}
                        onChange={(e) => setInterestRate(e.target.value)}
                        fullWidth
                        margin="normal"
                        sx={{ mb: { xs: 2, sm: 0 } }}
                    />
                    <TextField
                        label="연도"
                        variant="outlined"
                        type="number"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={calculateInterest}
                        fullWidth
                        sx={{ mt: { xs: 2, sm: 0 } }}
                    >
                        계산하기
                    </Button>
                </Box>

                {results.length > 0 && (
                    <Box sx={{ maxHeight: 500, overflowX: 'auto' }}>
                        <TableContainer component={Paper}>
                            <Table stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>대출금</TableCell>
                                        <TableCell>총 이자</TableCell>
                                        {Array.from({ length: 12 }, (_, i) => (
                                            <TableCell key={i}>{i + 1}월</TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {results.map((row, idx) => (
                                        <TableRow
                                            hover
                                            sx={{
                                                '&:hover': {
                                                    backgroundColor: '#f0f0f0',
                                                    cursor: 'pointer',
                                                },
                                            }}
                                            key={idx}
                                        >
                                            <TableCell>₩ {formatNumber(row.amount)}</TableCell>
                                            <TableCell>₩ {formatNumber(Math.floor(row.totalInterest))}</TableCell>
                                            {row.monthlyInterests.map((interest, i) => (
                                                <TableCell key={i}>₩ {formatNumber(interest)}</TableCell>
                                            ))}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                )}
            </Container>
        </BackgroundContainer>
    );
}
