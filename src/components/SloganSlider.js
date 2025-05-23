import React, { useEffect, useState } from 'react';
import '../styles/SloganSlider.css';

const initialSlogans = [
    "📝 나만의 작은 운동 루틴을 만들어보세요.",
    "🎯 상급자와 함께 운동 계획을 세워봐요!",
    "📖 운동이 처음이신가요? 설명서를 먼저 살펴보세요.",
    "🔥 지금부터 매일 한 걸음, 챌린지가 시작됩니다.",
];

const SloganSlider = () => {
    const [slogans, setSlogans] = useState(initialSlogans);
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setAnimate(true);
            setTimeout(() => {
                setAnimate(false);
                setSlogans((prev) => {
                    const [first, ...rest] = prev;
                    return [...rest, first];
                });
            }, 400);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="slogan-slider">
            <div className={`slogan-track ${animate ? 'animate' : ''}`}>
                {slogans.slice(0, 2).map((text, i) => (
                    <div className="slogan-slide" key={i}>
                        {text}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SloganSlider;
