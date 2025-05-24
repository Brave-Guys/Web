import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThumbsUp } from 'lucide-react';
import { getPopularPosts } from '../apis/getPosts';
import '../styles/PopularPostSlider.css';

const PopularPostSlider = () => {
    const [posts, setPosts] = useState([]);
    const [animate, setAnimate] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPopularPosts = async () => {
            try {
                const data = await getPopularPosts();
                setPosts(data);
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
                setPosts((prev) => {
                    const [first, ...rest] = prev;
                    return [...rest, first];
                });
            }, 400);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="popular-post-slider" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span className="popular-post-label">🔥 인기글:</span>
            <div >
                <div className={`popular-post-track ${animate ? 'animate' : ''}`}>
                    {posts.slice(0, 2).map((post, i) => (
                        <div
                            className="popular-post-slide"
                            key={i}
                            onClick={() => navigate(`/post/${post.id}`)}
                        >
                            <span className="popular-post-title">{post.category} {post.name}</span>
                            <span className="popular-post-likes">
                                <ThumbsUp size={16} style={{ marginRight: '4px' }} />
                                {post.likes ?? 0}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PopularPostSlider;
