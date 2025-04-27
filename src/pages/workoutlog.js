import React, { useState, useEffect } from 'react';
import PageTitle from '../components/PageTitle';
import Modal from '../components/Modal';
import WorkoutLogModalContent from '../components/WorkoutLogModalContent';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getWorkoutLogsByDate } from '../apis/getWorkoutLogs'; // ✨ 추가
import '../styles/WorkoutLog.css';

const WorkoutLog = () => {
    const today = new Date();
    const [currentDate, setCurrentDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
    const [selectedDate, setSelectedDate] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [logs, setLogs] = useState([]);

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

    // WorkoutLog.js (handleDayClick 함수 부분)
    const handleDayClick = async (day, currentMonth) => {
        if (!currentMonth) return;
        const fullDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        setSelectedDate(fullDate);
        setShowPopup(true);

        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const fetchedLogs = await getWorkoutLogsByDate({
                userId: user._id,
                date: fullDate.toISOString(), // 서버로 보낼 때 ISO 문자열 형태로!
            });
            setLogs(fetchedLogs);
        } catch (err) {
            console.error('운동 기록 불러오기 실패', err);
            setLogs([]);
        }
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

            <div className="calendar-header">
                <button onClick={goToPrevMonth}><ChevronLeft /></button>
                <strong>{year}년 {month + 1}월</strong>
                <button onClick={goToNextMonth}><ChevronRight /></button>
            </div>

            <div className="calendar-grid">
                {["일", "월", "화", "수", "목", "금", "토"].map(day => (
                    <div key={day} className="calendar-day-name">{day}</div>
                ))}
                {calendarDays.map((d, i) => (
                    <div
                        key={i}
                        className={`calendar-day ${d.currentMonth ? 'current' : 'inactive'}`}
                        onClick={() => handleDayClick(d.day, d.currentMonth)}
                    >
                        {d.day}
                    </div>
                ))}
            </div>

            {showPopup && (
                <Modal
                    visible={showPopup}
                    onClose={() => setShowPopup(false)}
                    title={selectedDate?.toLocaleDateString()}
                >
                    <WorkoutLogModalContent
                        selectedDate={selectedDate}
                        initialLogs={logs} // ✨ 서버에서 불러온 logs를 넘겨준다!
                    />
                </Modal>
            )}


        </div>
    );
};

export default WorkoutLog;
