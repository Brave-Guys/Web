import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ExerciseTip.css';
import FrontBody from '../assets/body_front.png';
import BackBody from '../assets/body_back.png';

const ExerciseTip = () => {
    const [hoverText, setHoverText] = useState('');
    const [isFront, setIsFront] = useState(true); // 앞모습 or 뒷모습
    const navigate = useNavigate();

    const handleMouseEnter = (part) => {
        const descriptions = {
            chest: '이 부위는 가슴입니다. 대표 운동: 벤치프레스, 체스트플라이, 딥스',
            shoulder: '이 부위는 어깨입니다. 전면, 측면, 후면으로 구분됩니다.',
            bicep: '이 부위는 이두입니다. 대표 운동: 바벨컬, 덤벨컬',
            abs: '이 부위는 복근입니다. 대표 운동: 크런치, 레그레이즈',
            thigh: '이 부위는 앞 허벅지입니다. 대표 운동: 스쿼트, 런지',
            back: '이 부위는 등입니다. 대표 운동: 데드리프트, 풀업',
            tricep: '이 부위는 삼두입니다. 대표 운동: 트라이셉스 익스텐션',
            hamstring: '이 부위는 햄스트링입니다. 대표 운동: 레그컬, 루마니안 데드리프트',
        };
        setHoverText(descriptions[part]);
    };

    const handleMouseLeave = () => {
        setHoverText('');
    };

    const handleClick = (part) => {
        navigate(`/exercise-tip/${part}`);
    };

    const toggleFrontBack = () => {
        setIsFront((prev) => !prev);
        setHoverText(''); // 전환할 때 hover 설명 초기화
    };

    return (
        <div className="exercise-tip-container">
            <div className="toggle-button">
                <button onClick={toggleFrontBack}>
                    {isFront ? '뒷모습 보기' : '앞모습 보기'}
                </button>
            </div>

            <div className="body-map">
                <img
                    src={isFront ? FrontBody : BackBody}
                    alt={isFront ? 'Front Body' : 'Back Body'}
                    className="body-image"
                />

                {/* 앞모습 영역 */}
                {isFront && (
                    <>
                        <div className="area chest" onMouseEnter={() => handleMouseEnter('chest')} onMouseLeave={handleMouseLeave} onClick={() => handleClick('chest')} />
                        <div className="area shoulder" onMouseEnter={() => handleMouseEnter('shoulder')} onMouseLeave={handleMouseLeave} onClick={() => handleClick('shoulder')} />
                        <div className="area bicep" onMouseEnter={() => handleMouseEnter('bicep')} onMouseLeave={handleMouseLeave} onClick={() => handleClick('bicep')} />
                        <div className="area abs" onMouseEnter={() => handleMouseEnter('abs')} onMouseLeave={handleMouseLeave} onClick={() => handleClick('abs')} />
                        <div className="area thigh" onMouseEnter={() => handleMouseEnter('thigh')} onMouseLeave={handleMouseLeave} onClick={() => handleClick('thigh')} />
                    </>
                )}

                {/* 뒷모습 영역 */}
                {!isFront && (
                    <>
                        <div className="area back" onMouseEnter={() => handleMouseEnter('back')} onMouseLeave={handleMouseLeave} onClick={() => handleClick('back')} />
                        <div className="area shoulder" onMouseEnter={() => handleMouseEnter('shoulder')} onMouseLeave={handleMouseLeave} onClick={() => handleClick('shoulder')} />
                        <div className="area tricep" onMouseEnter={() => handleMouseEnter('tricep')} onMouseLeave={handleMouseLeave} onClick={() => handleClick('tricep')} />
                        <div className="area hamstring" onMouseEnter={() => handleMouseEnter('hamstring')} onMouseLeave={handleMouseLeave} onClick={() => handleClick('hamstring')} />
                    </>
                )}
            </div>

            <div className="hover-description">
                {hoverText && <p>{hoverText}</p>}
            </div>
        </div>
    );
};

export default ExerciseTip;
