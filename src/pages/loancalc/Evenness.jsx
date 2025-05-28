import { useState } from "react";
import '@styles/loancalc/Expiration.scss';
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
import { parseNumber, numberOnly, formatNumber } from "@components/utils/Utils";

export default function Evenness() {
    const [principal, setPrincipal] = useState('');             // 대출금
    const [interestRate, setInterestRate] = useState('');       // 금리
    const [period, setPeriod] = useState('');                   // 기간

    const [results, setResults] = useState([]);

    const handleFormatChange = (type, value) => {
        switch (type) {
            case 'principal':
                setPrincipal(formatNumber(numberOnly(value)));
                break;
        }
    };

    const calculateInterest = () => {
        const maxAmount = parseInt(parseNumber(principal), 10);
        const rate = parseFloat(interestRate) / 100 / 12;
        const month = parseInt(period, 10);

        if (!maxAmount || !rate || !month) {
            alert("대출금, 이자율, 대출기간을 정확히 입력해주세요.");
            return;
        }

        const A = maxAmount * (rate * Math.pow(1 + rate, month)) / (Math.pow(1 + rate, month) - 1);
        let remaining = maxAmount;

        const rows = [];
        for (let i = 1; i <= month; i++) {
            let interest = Math.floor(remaining * rate);
            let principalPayment = Math.floor(A - interest);

            // 마지막 회차일 경우 원금 전액 처리
            if (i === month) {
                principalPayment = remaining;
                interest = Math.floor(A - principalPayment);
            }

            remaining -= principalPayment;

            rows.push({
                month: i,
                payment: interest + principalPayment,
                interest,
                principal: principalPayment,
                balance: Math.max(remaining, 0),
            });
        }

        setResults(rows);
    };

    return (
        <Box className="background-container">
            <Container maxWidth="xl" disableGutters>
                <Typography variant="h4" gutterBottom align="center" sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}>
                    📅 원리금 균등상환 계산기
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, mb: 3 }}>
                    <TextField
                        label="대출금 (₩)"
                        variant="outlined"
                        value={principal}
                        onChange={(e) => handleFormatChange('principal', e.target.value)}
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
                        label="상환개월 수"
                        variant="outlined"
                        type="number"
                        value={period}
                        onChange={(e) => setPeriod(e.target.value)}
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
                                        <TableCell>회차</TableCell>
                                        <TableCell>월 상환금</TableCell>
                                        <TableCell>원금</TableCell>
                                        <TableCell>이자</TableCell>
                                        <TableCell>잔금</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {results.map((row, idx) => (
                                        <TableRow
                                            hover
                                            key={idx}
                                            sx={{
                                                '&:hover': {
                                                    backgroundColor: '#f0f0f0',
                                                    cursor: 'pointer',
                                                },
                                            }}
                                        >
                                            <TableCell>{row.month} 회</TableCell>
                                            <TableCell>₩ {formatNumber(row.payment)}</TableCell>
                                            <TableCell>₩ {formatNumber(row.principal)}</TableCell>
                                            <TableCell>₩ {formatNumber(row.interest)}</TableCell>
                                            <TableCell>₩ {formatNumber(row.balance)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                )}
            </Container>
        </Box>
    );
}