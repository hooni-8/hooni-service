import React, { useState } from 'react';
import { Calendar, Badge, Modal, List, ConfigProvider, Button, Row, Col } from 'antd';
import dayjs from 'dayjs';
import koKR from 'antd/locale/ko_KR';  // 한글 로케일 import
import 'dayjs/locale/ko';

dayjs.locale('ko');  // dayjs 한글 설정

export default function CashFlow() {
    // 샘플 데이터: 날짜별 수입/지출 내역
    const [records] = useState({
        '2025-08-01': [
            { type: 'income', title: '월급', amount: 3000000, description: '개꿀' },
            { type: 'expense', title: '점심', amount: 8000, description: '대신 결제' },
            { type: 'expense', title: '점심', amount: 8000 },
            { type: 'expense', title: '점심', amount: 8000 },
            { type: 'expense', title: '점심', amount: 8000 },
            { type: 'expense', title: '점심', amount: 8000 },
        ],
        '2025-08-04': [
            { type: 'expense', title: '택시', amount: 15000 },
        ],
        '2025-08-07': [
            { type: 'income', title: '월급', amount: 3000000 },
            { type: 'expense', title: '점심', amount: 8000 },
            { type: 'expense', title: '점심', amount: 8000 },
            { type: 'expense', title: '점심', amount: 8000 },
            { type: 'expense', title: '점심', amount: 8000 },
            { type: 'expense', title: '점심', amount: 8000 },
        ],
    });

    // 달력 각 날짜에 표시할 내용 리턴
    const dateCellRender = (value) => {
        const dateStr = value.format('YYYY-MM-DD');
        const dayRecords = records[dateStr] || [];

        return (
            <ul style={{ paddingLeft: 0, listStyle: 'none' }}>
                {dayRecords.map((item, idx) => (
                    <li key={idx}>
                        <Badge
                            status={item.type === 'income' ? 'success' : 'error'}
                            text={`${item.title}: ${item.amount.toLocaleString()}원`}
                        />
                    </li>
                ))}
            </ul>
        );
    };

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [currentMonth, setCurrentMonth] = useState(dayjs());

    const onSelect = (value) => {
        setSelectedDate(value.format('YYYY-MM-DD'));
        setModalOpen(true);
    };

    const onMonthChange = (offset) => {
        setCurrentMonth(currentMonth.add(offset, 'month'));
    };

    return (
        <>
            <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
                <Col>
                    <Button onClick={() => onMonthChange(-1)}>◀</Button>
                </Col>

                <Col flex="auto">
                    <ConfigProvider locale={koKR}>
                        <div style={{ maxWidth: 1500, margin: '40px auto', padding: 20 }}>
                            <Calendar
                                value={currentMonth}
                                dateCellRender={dateCellRender}
                                onSelect={onSelect}
                            />
                            <Modal
                                title={selectedDate}
                                open={modalOpen}
                                onCancel={() => setModalOpen(false)}
                                footer={null}
                            >
                                <List
                                    dataSource={records[selectedDate] || []}
                                    renderItem={(item) => (
                                        <List.Item>
                                            <List.Item.Meta
                                                title={`${item.type === 'income' ? '수입' : '지출'} - ${item.title}`}
                                                description={`${item.amount.toLocaleString()} 원`}
                                            />
                                            {item.description}
                                        </List.Item>
                                    )}
                                    locale={{ emptyText: '내역이 없습니다.' }}
                                />
                            </Modal>
                        </div>
                    </ConfigProvider>
                </Col>

                <Col>
                    <Button onClick={() => onMonthChange(1)}>▶</Button>
                </Col>
            </Row>
        </>
    );
}
