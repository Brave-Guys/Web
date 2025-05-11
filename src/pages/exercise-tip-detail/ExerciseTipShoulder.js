import React, { useState } from 'react';
import '../../styles/ExerciseTipShoulder.css';
import ShoulderImage from '../../assets/shoulder_detail.png';

const ExerciseTipShoulder = () => {
  const [selectedPart, setSelectedPart] = useState('');

  const exerciseData = {
    전면: [
      { title: '프론트 레이즈', desc: '전면 어깨를 자극하는 대표 운동입니다.' },
      { title: '밀리터리 프레스', desc: '어깨 전체에 자극을 주며 전면에 특히 효과적입니다.' },
      { title: '아놀드 프레스', desc: '어깨의 전면과 측면을 동시에 자극합니다.' },
      {
        title: '오버헤드 프레스',
        desc: [
          '바벨을 쇄골 바로 위에 위치시킨다.',
          '팔꿈치는 바벨보다 앞에 위치해야 한다.',
          '가슴을 펴고 엉덩이에 힘을 주며 머리부터 발끝까지 바로 선 자세를 유지한다.',
          '발 너비는 어깨너비로 유지하고, 바벨을 머리 위로 들어 올린다.',
          '엉덩이와 코어에 힘을 주며 바벨을 천천히 내려 시작 자세로 돌아간다.',
          '호흡은 올릴 때 내쉬고, 내릴 때 들이쉰다.',
        ]
      }
    ],
    측면: [
      { title: '사이드 레터럴 레이즈', desc: '측면 어깨를 집중적으로 단련합니다.' },
      { title: '업라이트 로우', desc: '측면 어깨 및 승모근 강화에 좋습니다.' },
      { title: '덤벨 스윙', desc: '측면 어깨의 안정성과 힘을 기릅니다.' },
      { title: '케이블 레터럴 레이즈', desc: '지속적인 긴장으로 측면 어깨를 자극합니다.' },
    ],
    후면: [
      { title: '리어 델트 플라이', desc: '후면 어깨(후삼각근)를 공략하는 대표 운동입니다.' },
      { title: '페이스 풀', desc: '후면 어깨와 상부 등 근육까지 자극합니다.' },
      { title: '벤트오버 레터럴 레이즈', desc: '상체를 숙여 후면 어깨에 집중하는 운동입니다.' },
    ],
  };

  return (
    <div className="shoulder-wrapper">
      <div className="shoulder-page">
        <div className="left-section">
          <h2 className="section-title">어깨 부위</h2>
          <div className="shoulder-image-wrapper">
            <img src={ShoulderImage} alt="Shoulder Detail" className="shoulder-image" />
            <div className="area front" onClick={() => setSelectedPart('전면')} />
            <div className="area side" onClick={() => setSelectedPart('측면')} />
            <div className="area rear" onClick={() => setSelectedPart('후면')} />
          </div>
        </div>

        <div className="right-section">
          <h2 className="section-title">
            {selectedPart ? `${selectedPart} 어깨 운동` : '어깨 부위를 선택해보세요!'}
          </h2>
          {selectedPart && (
            <div className="exercise-list">
              {exerciseData[selectedPart].map((exercise, idx) => (
                <div key={idx} className="exercise-card">
                  <div className="exercise-image" />
                  <div className="exercise-description">
                    <p className="exercise-title">{exercise.title}</p>
                    <p>{exercise.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExerciseTipShoulder;
