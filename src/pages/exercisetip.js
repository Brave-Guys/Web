import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ExerciseTip.css';
import FrontBody from '../assets/body_front.png';
import BackBody from '../assets/body_back.png';
import { bodyPartSummaries } from '../constants/exerciseScript';

const ExerciseTip = () => {
  const [tooltipText, setTooltipText] = useState('');
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  const handleMouseEnter = (part, e) => {
    console.log(part); // 여기서 'part' 값 확인
    const info = bodyPartSummaries[part];
    if (!info) return; // 'info'가 없으면 반환

    const { name, description } = bodyPartSummaries[part];
    const formatted = `<div class="hover-title">${name}</div><div class="hover-description">${description.replace(/\n/g, '<br>')}</div>`;
    setTooltipText(formatted);
    setTooltipPos({ x: e.clientX + 15, y: e.clientY + 15 });
  };

  const handleMouseMove = (e) => {
    setTooltipPos({ x: e.clientX + 15, y: e.clientY + 15 });
  };

  const handleMouseLeave = () => {
    setTooltipText('');
  };

  const handleClick = (part) => {
    navigate(`/exercise-tip/${part}`);
  };

  return (
    <div className="exercise-tip-container">
      <div className="body-map-wrapper">
        {/* 앞모습 */}
        <div className="body-map-area">
          <img src={FrontBody} alt="Front Body" className="body-image" />

          <div className="area chest" onMouseEnter={(e) => handleMouseEnter('chest', e)} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} onClick={() => handleClick('chest')} />
          <div className="area shoulder" onMouseEnter={(e) => handleMouseEnter('shoulders', e)} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} onClick={() => handleClick('shoulder')} />
          <div className="area bicep" onMouseEnter={(e) => handleMouseEnter('biceps', e)} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} onClick={() => handleClick('bicep')} />
          <div className="area abs" onMouseEnter={(e) => handleMouseEnter('abs', e)} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} onClick={() => handleClick('abs')} />
          <div className="area thigh" onMouseEnter={(e) => handleMouseEnter('thigh', e)} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} onClick={() => handleClick('thigh')} />
        </div>

        {/* 뒷모습 */}
        <div className="body-map-area">
          <img src={BackBody} alt="Back Body" className="body-image" />

          <div className="area back" onMouseEnter={(e) => handleMouseEnter('back', e)} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} onClick={() => handleClick('back')} />
          <div className="area tricep" onMouseEnter={(e) => handleMouseEnter('triceps', e)} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} onClick={() => handleClick('tricep')} />
          <div className="area hamstring" onMouseEnter={(e) => handleMouseEnter('hamstring', e)} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} onClick={() => handleClick('hamstring')} />
        </div>

        {/* 말풍선 */}
        {tooltipText && (
          <div
            className="tooltip"
            style={{
              top: tooltipPos.y,
              left: tooltipPos.x,
            }}
            dangerouslySetInnerHTML={{ __html: tooltipText }}
          />
        )}
      </div>
    </div>
  );
};

export default ExerciseTip;
