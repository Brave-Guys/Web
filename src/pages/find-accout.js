import React, { useState, useEffect } from 'react';
import PageTitle from '../components/PageTitle';
import '../styles/find-account.css';

const FindAccount = () => {
  const [activeTab, setActiveTab] = useState('password'); 
  const [showVerificationInput, setShowVerificationInput] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180); // 3분 타이머 (초 단위)

  const handleEmailAuthClick = () => {
    setShowVerificationInput(true);
    setTimeLeft(180); // 타이머 초기화
  };

  useEffect(() => {
    if (showVerificationInput && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [showVerificationInput, timeLeft]);

  const formatTime = (seconds) => {
    const min = String(Math.floor(seconds / 60)).padStart(2, '0');
    const sec = String(seconds % 60).padStart(2, '0');
    return `${min}:${sec}`;
  };

  return (
    <div className="find-account-container">
      <div className="page-title">
        <PageTitle title="계정 정보 찾기" showBackArrow={true} />
      </div>

      <div className="find-account-box">
        <div className="tab-menu">
          <span
            className={activeTab === 'id' ? 'tab active' : 'tab'}
            onClick={() => {
              setActiveTab('id');
              setShowVerificationInput(false);
            }}
          >
            아이디 찾기
          </span>
          <span
            className={activeTab === 'password' ? 'tab active' : 'tab'}
            onClick={() => {
              setActiveTab('password');
              setShowVerificationInput(false);
            }}
          >
            비밀번호 찾기
          </span>
        </div>

        {activeTab === 'id' && (
          <div className="tab-content">
            <div className="form-group">
              <label>이름을 입력해주세요.</label>
              <input type="text" placeholder="이름을 입력해주세요" />
            </div>
            <div className="form-group">
              <label>가입 시 사용한 이메일을 입력해주세요.</label>
              <input type="email" placeholder="이메일을 입력해주세요" />
            </div>
            <button className="email-button">아이디 찾기</button>
          </div>
        )}

        {activeTab === 'password' && (
          <div className="tab-content">
            <div className="form-group">
              <label>계정 ID를 입력해주세요.</label>
              <input type="text" placeholder="아이디를 입력해주세요" />
            </div>
            <div className="form-group">
              <label>가입 시 사용했던 이메일을 입력해주세요.</label>
              <input type="email" placeholder="이메일을 입력해주세요" />
            </div>
            <button className="email-button" onClick={handleEmailAuthClick}>이메일 인증</button>

            {showVerificationInput && (
              <div className="form-group verification-group">
                <label>인증번호를 입력해주세요.</label>
                <div className="verification-row">
                  <input
                    type="text"
                    placeholder="_ _ _ _ _"
                    maxLength={6}
                    className="verification-input"
                  />
                  <button className="verify-button">확인</button>
                  <span className="timer">{formatTime(timeLeft)}</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FindAccount;
