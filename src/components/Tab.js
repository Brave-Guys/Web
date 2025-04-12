import React from 'react';
import '../styles/Tab.css';

const Tab = ({ tabs, activeIndex, onTabClick }) => {
    return (
        <div className="tab-container">
            {tabs.map((tab, index) => (
                <button
                    key={index}
                    className={`tab-button ${index === activeIndex ? 'active' : ''}`}
                    onClick={() => onTabClick(index)}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
};

export default Tab;
