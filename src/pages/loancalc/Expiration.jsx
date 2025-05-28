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

export default function Expiration() {
    const [principal, setPrincipal] = useState('');             // 대출금
    const [interestRate, setInterestRate] = useState('');       // 금리
    const [unit, setUnit] = useState('1,000,000');              // 단위
    const [year, setYear] = useState(new Date().getFullYear());        // 연도

    const [results, setResults] = useState([]);

    const handleFormatChange = (type, value) => {
        switch (type) {
            case 'principal':
                setPrincipal(formatNumber(numberOnly(value)));
                break;
            case 'unit':
                setUnit(formatNumber(numberOnly(value)));
                break;
        }
    };

    const calculateInterest = () => {
        const maxAmount = parseInt(parseNumber(principal), 10);
        const rate = parseFloat(interestRate) / 100;
        const unitInt = parseInt(parseNumber(unit), 10);

        if (!maxAmount || !rate) {
            alert("대출금과 이자율을 정확히 입력해주세요.");
            return;
        } else if (maxAmount < unitInt) {
            alert("대출금보다 단위가 높을 수 없습니다.");
            return;
        }

        const rows = [];
        for (let amount = maxAmount; amount > 0; amount -= unitInt) {
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
        <Box className="background-container">
            <Container maxWidth="xl" disableGutters>
                <Typography variant="h4" gutterBottom align="center" sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}>
                    💰 만기일시상환 이자 계산기
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
                        label="단위"
                        variant="outlined"
                        value={unit}
                        onChange={(e) => handleFormatChange('unit', e.target.value)}
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
        </Box>
    );
}
