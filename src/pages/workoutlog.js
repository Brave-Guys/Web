import React, { useState, useEffect } from 'react';
import PageTitle from '../components/PageTitle';
import Modal from '../components/Modal';
import WorkoutLogModalContent from '../components/WorkoutLogModalContent';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getWorkoutLogsByDateRange } from '../apis/getWorkoutLogs';
import { calculateTotalScore } from '../utils/calculateTotalScore';
import '../styles/WorkoutLog.css';

const WorkoutLog = () => {
    const today = new Date();
    const [currentDate, setCurrentDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
    const [selectedDate, setSelectedDate] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [logs, setLogs] = useState([]);
    const [monthLogs, setMonthLogs] = useState([]);

    const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const getStartDay = (year, month) => new Date(year, month, 1).getDay();

    const fetchMonthLogs = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
            const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

            console.log(startDate.toISOString(), endDate.toISOString());
            
            const response = await getWorkoutLogsByDateRange(
                user._id,
                startDate.toISOString(),
                endDate.toISOString()
            );


            setMonthLogs(response);
        } catch (err) {
            console.error('월별 운동 기록 불러오기 실패', err);
            setMonthLogs([]);
        }
    };

    useEffect(() => {
        fetchMonthLogs();
    }, [currentDate]);

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
        setSelectedDate(fullDate);
        setShowPopup(true);

        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const response = await getWorkoutLogsByDateRange({
                userId: user._id,
                startDate: fullDate.toISOString(),
                endDate: new Date(fullDate.getFullYear(), fullDate.getMonth(), fullDate.getDate() + 1).toISOString(),
            });
            setLogs(response);
        } catch (err) {
            console.error('운동 기록 불러오기 실패', err);
            setLogs([]);
        }
    };

    const calculateDailyScores = (logs) => {
        const scoreMap = {};

        logs.forEach(log => {
            const date = new Date(log.date);
            const day = date.getDate();
            if (!scoreMap[day]) scoreMap[day] = [];
            scoreMap[day].push(log);
        });

        const dailyScores = {};
        Object.keys(scoreMap).forEach(day => {
            dailyScores[day] = calculateTotalScore(scoreMap[day]);
        });

        return dailyScores;
    };

    const getColorByScore = (score) => {
        if (score === 0) return '#D9D9D9';
        if (score <= 60) return '#B3E6B3';
        if (score <= 100) return '#80D480';
        if (score <= 140) return '#4DC34D';
        return '#00AA00';
    };

    const calendarDays = generateCalendar();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const dailyScores = calculateDailyScores(monthLogs);

    return (
        <div className="calendar-container">
            <PageTitle
                title="운동 기록"
                description="나의 운동 기록을 확인해보세요."
                showBackArrow={true}
            />

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
                    const dayScore = dailyScores[d.day] || 0;
                    const backgroundColor = d.currentMonth ? getColorByScore(dayScore) : '#f2f2f2';

                    return (
                        <div
                            key={i}
                            className={`calendar-day ${d.currentMonth ? 'current' : 'inactive'}`}
                            style={{ backgroundColor }}
                            onClick={() => handleDayClick(d.day, d.currentMonth)}
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
                    title={selectedDate?.toLocaleDateString()}
                >
                    <WorkoutLogModalContent
                        selectedDate={selectedDate}
                        initialLogs={logs}
                    />
                </Modal>
            )}
        </div>
    );
};

export default WorkoutLog;
