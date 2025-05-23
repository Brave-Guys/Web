import React, { useEffect, useState } from 'react';
import '../styles/SloganSlider.css';

const slogans = [
    "🏋️ 운동을 관리해보세요!",
    "🎯 상급자에게 가이드를 받아보세요!",
    "📘 초보자이신가요? 운동 설명서를 읽어봅시다!",
    "🔥 챌린지를 통해 꾸준함을 기를 수 있어요!",
];

const SloganSlider = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % slogans.length);
        }, 3000); // 3초 간격

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="slogan-slider">
            <div
                className="slogan-track-vertical"
                style={{ transform: `translateY(-${index * 36}px)` }} // 1줄당 36px
            >
                {slogans.map((text, i) => (
                    <div className="slogan-slide-vertical" key={i}>
                        {text}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SloganSlider;
