import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Masters.css';
import PageTitle from '../components/PageTitle';

const Masters = () => {
    return (
        <div className="masterpage-wrapper">
            <div className="title-row">
                <PageTitle
                    title="상급자"
                    description="부위별 상급자를 만나보세요."
                    showBackArrow={true}
                />
                <Link to="/how-to-be-master" className="help-link">
                    상급자가 되려면 어떻게 해야 하나요?
                </Link>
            </div>
        </div>
    );
};

export default Masters;
