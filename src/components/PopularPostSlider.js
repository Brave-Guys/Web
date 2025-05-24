import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThumbsUp } from 'lucide-react';
import { getPopularPosts } from '../apis/getPosts';
import '../styles/SloganSlider.css';

const PopularPostSlider = () => {

    const [slogans, setSlogans] = useState([]);
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        const fetchPopularPosts = async () => {
            try {
                const data = await getPopularPosts();
                setSlogans(data);
            } catch (err) {
                console.error('인기글 불러오기 실패:', err);
            }
        };
        fetchPopularPosts();
    }, []);

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
                        {text.name}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PopularPostSlider;
