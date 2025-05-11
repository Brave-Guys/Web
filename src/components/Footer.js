import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
    return (
        <footer className="app-footer">
            <div className="footer-inner">
                <div className="footer-brand">
                    <p className="footer-logo">StrengthHub</p>
                    <p className="footer-copy">&copy; 2025 StrengthHub Inc. All rights reserved.</p>
                </div>

                <div className="footer-links">
                    <a href="/terms">이용약관</a>
                    <a href="/privacy">개인정보처리방침</a>
                    <a href="/contact">고객센터</a>
                </div>

                <div className="footer-social">
                    <a href="https://www.instagram.com" target="_blank" rel="noreferrer">Instagram</a>
                    <a href="https://www.youtube.com" target="_blank" rel="noreferrer">YouTube</a>
                    <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
