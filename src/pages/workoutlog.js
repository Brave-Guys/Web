import React, { useState, useEffect } from 'react';
import PageTitle from '../components/PageTitle';
import Modal from '../components/Modal';
import WorkoutLogModalContent from '../components/WorkoutLogModalContent';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getWorkoutLogsByDate, getWorkoutLogsByDateRange } from '../apis/getWorkoutLogs';
import { calculateTotalScore } from '../utils/calculateTotalScore';
import { formatDateOnly } from '../utils/dateUtils';
import '../styles/WorkoutLog.css';

const WorkoutLog = () => {
    const today = new Date();
    const [currentDate, setCurrentDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
    const [selectedDate, setSelectedDate] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [logs, setLogs] = useState([]);
    const [monthLogs, setMonthLogs] = useState([]);

    useEffect(() => {
        fetchMonthLogs();
    }, [currentDate]);

    const fetchMonthLogs = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
            const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

            const response = await getWorkoutLogsByDateRange(
                user.id,
                formatDateOnly(startDate),
                formatDateOnly(endDate)
            );
            setMonthLogs(response);
        } catch (err) {
            console.error('월별 운동 기록 불러오기 실패', err);
            setMonthLogs([]);
        }
    };

    const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const getStartDay = (year, month) => new Date(year, month, 1).getDay();

    const generateCalendar = () => {
        const days = [];
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const daysInMonth = getDaysInMonth(year, month);
        const startDay = getStartDay(year, month);
        const prevMonthLastDate = new Date(year, month, 0).getDate();

        for (let i = startDay - 1; i >= 0; i--) {
            days.push({ day: prevMonthLastDate - i, currentMonth: false });
        }

        for (let i = 1; i <= daysInMonth; i++) {
            days.push({ day: i, currentMonth: true });
        }

        const remaining = 42 - days.length;
        for (let i = 1; i <= remaining; i++) {
            days.push({ day: i, currentMonth: false });
        }

        return days;
    };

    const goToPrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const goToNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const handleDayClick = async (day, currentMonth) => {
        if (!currentMonth) return;
        const fullDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        const formattedDate = formatDateOnly(fullDate);
        setSelectedDate(fullDate);
        setShowPopup(true);

        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const fetchedLogs = await getWorkoutLogsByDate({
                userId: user.id,
                date: formattedDate,
            });
            setLogs(fetchedLogs);
        } catch (err) {
            console.error('운동 기록 불러오기 실패', err);
            setLogs([]);
        }
    };

    const getCellBackgroundColor = (score) => {
        if (score === 0) return '#D9D9D9';
        if (score <= 60) return '#B3E6B3';
        if (score <= 100) return '#80D480';
        if (score <= 140) return '#4DC34D';
        return '#00AA00';
    };

    const calendarDays = generateCalendar();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    return (
        <div className="calendar-container">
            <PageTitle
                title="운동 기록"
                description="나의 운동 기록을 확인해보세요."
                showBackArrow={true}
            />

            <div className='blank'></div>

            <div style={{ display: 'flex', gap: '40px' }} className='workoutlog-content'>
                <div style={{ flex: 3 }}>
                    <div className="calendar-header">
                        <button onClick={goToPrevMonth}><ChevronLeft /></button>
                        <strong>{year}년 {month + 1}월</strong>
                        <button onClick={goToNextMonth}><ChevronRight /></button>
                    </div>

                    <div className="calendar-grid">
                        {["일", "월", "화", "수", "목", "금", "토"].map(day => (
                            <div key={day} className="calendar-day-name">{day}</div>
                        ))}

                        {calendarDays.map((d, i) => {
                            const logsForDay = monthLogs.filter(log => {
                                const logDate = new Date(log.date);
                                return (
                                    logDate.getFullYear() === year &&
                                    logDate.getMonth() === month &&
                                    logDate.getDate() === d.day
                                );
                            });
                            const dayScore = calculateTotalScore(logsForDay);

                            return (
                                <div
                                    key={i}
                                    className={`calendar-day ${d.currentMonth ? 'current' : 'inactive'}`}
                                    onClick={() => handleDayClick(d.day, d.currentMonth)}
                                    style={{
                                        backgroundColor: d.currentMonth ? getCellBackgroundColor(dayScore) : undefined,
                                        color: d.currentMonth && getCellBackgroundColor(dayScore) === '#00AA00' ? 'white' : 'black',
                                    }}
                                >
                                    {d.day}
                                </div>
                            );
                        })}
                    </div>

                    {showPopup && (
                        <Modal
                            visible={showPopup}
                            onClose={() => setShowPopup(false)}
                            title={selectedDate ? selectedDate.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'long' }) : ''}
                        >
                            <WorkoutLogModalContent
                                selectedDate={selectedDate}
                                initialLogs={logs}
                                onLogSaved={fetchMonthLogs}
                            />
                        </Modal>
                    )}
                </div>
                <div style={{ flex: 1 }}>
                    <div className="score-legend-box">
                        <h3>운동 강도</h3>
                        <ul className="score-legend-list">
                            <li>
                                <span style={{ backgroundColor: '#D9D9D9' }} />
                                <div className="legend-text">
                                    <span className="label">운동 기록 없음</span>
                                    <span className="score">0점</span>
                                </div>
                            </li>
                            <li>
                                <span style={{ backgroundColor: '#B3E6B3' }} />
                                <div className="legend-text">
                                    <span className="label">가벼운 운동</span>
                                    <span className="score">1 ~ 60점</span>
                                </div>
                            </li>
                            <li>
                                <span style={{ backgroundColor: '#80D480' }} />
                                <div className="legend-text">
                                    <span className="label">평균</span>
                                    <span className="score">61 ~ 100점</span>
                                </div>
                            </li>
                            <li>
                                <span style={{ backgroundColor: '#4DC34D' }} />
                                <div className="legend-text">
                                    <span className="label">열심히 운동</span>
                                    <span className="score">101 ~ 140점</span>
                                </div>
                            </li>
                            <li>
                                <span style={{ backgroundColor: '#00AA00' }} />
                                <div className="legend-text">
                                    <span className="label">최고의 운동</span>
                                    <span className="score">141점 이상</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkoutLog;
