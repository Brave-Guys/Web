import React from 'react';
import '../styles/main.css';

const Main = () => {
    return (
        <div className="main-page">
            <div className="welcome-text">
                <div style={{ display: 'flex', alignItems: 'space-between' }}>
                    <h2>강인석님 반가워요!</h2>
                    <div style={{ flexGrow: '5' }}></div>
                    <h2 className="pro-badge">PRO</h2>
                </div>
                <p>내 운동을 관리해보세요.</p>
            </div>

            <div className="card-grid">
                {/* 첫 줄 */}
                <div className="card span-1 clickable">
                    <div className="card-title">3월 기록 <span className="arrow">&gt;</span></div>
                    <div className="record-section">
                        <div className="record-grid">
                            {[...Array(30)].map((_, i) => (
                                <div key={i} className={`record-cell level-${(i % 4) + 1}`}></div>
                            ))}
                        </div>
                        <div className="record-info">
                            <p className="average">평균 운동량</p>
                            <p><span className="highlight">주횟수:</span> 3.3회</p>
                            <p><span className="highlight">러닝:</span> 3.3km</p>
                            <p><span className="highlight">윗몸일으키기:</span> 45회</p>
                        </div>
                    </div>
                </div>

                <div className="card span-1 clickable">
                    <div className="card-title">Share+ <span className="arrow">&gt;</span></div>
                    <div className="share-icons">
                        <div className="circle">이영정</div>
                        <div className="circle">김희겸</div>
                        <div className="circle">이민규</div>
                    </div>
                </div>

                {/* 둘째 줄 */}
                <div className="card span-1 clickable">
                    <div className="card-title">금주의 운동 <span className="arrow">&gt;</span></div>
                    <div className="thumbnail-placeholder">영상</div>
                </div>

                <div className="card span-1">
                    <div className="card-title">기본 운동 설명서 <span className="arrow">&gt;</span></div>
                    <div className="exercise-section">
                        <p className="exercise-name"><strong>스쿼트</strong></p>
                        <ul className="exercise-list">
                            <li>무릎이 발끝을 넘지 않도록</li>
                            <li>허리를 곧게 펴고 깊이 앉기</li>
                            <li>발바닥 전체로 지지하며 천천히 일어나기</li>
                        </ul>
                    </div>
                </div>


                {/* 셋째 줄 */}
                <div className="card wide clickable">
                    <div className="card-title">게시판 <span className="arrow">&gt;</span></div>
                    <div className="board-preview">
                        <p>스쿼트 할 때 무릎 통증...문제 있는 걸까요?</p>
                        <p>3개월 차인데 근성장이 너무 더뎌요 ㅠㅠ</p>
                        <p>벤치프레스 자세, 어디가 잘못된 걸까요?</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main;
