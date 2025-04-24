import React from 'react';
import { useParams } from 'react-router-dom';
import { ThumbsUp, MessageCircle } from 'lucide-react';
import CommentItem from '../components/CommentItem';
import '../styles/PostDetail.css';

const PostDetail = () => {
    const { id } = useParams();

    const post = {
        author: '강인석',
        time: '1시간 전',
        content: '80→72 운동 안했는데 눈바디 몸 좋아짐 ㄷㄷ',
        title: '몸무게 몸변화',
        likes: 10,
        comments: 2,
        commentsList: [
            { id: 1, name: '김희겸', time: '45분 전', content: '생존근육 아니지?', likes: 5 },
            { id: 2, name: '이민국', time: '30분 전', content: '굿굿', likes: 3 },
        ]
    };

    return (
        <div className="post-detail-container">
            <h1 className="post-title">{post.title}</h1>

            <div className="post-header">
                <div className="profile-icon"></div>
                <div className="nickname">{post.author}</div>
                <div className="post-time">{post.time}</div>
                <div className="post-actions">
                    <span>수정</span>
                    <span>|</span>
                    <span>삭제</span>
                </div>
            </div>

            <div className="post-content">{post.content}</div>

            <div className="post-footer">
                <div className="reaction">
                    <ThumbsUp size={20} color="red" /> <span>{post.likes}</span>
                </div>
                <div className="reaction">
                    <MessageCircle size={20} color="blue" /> <span>{post.comments}</span>
                </div>
            </div>

            <div className="comment-input-wrapper">
                <input type="text" placeholder="댓글을 작성하세요!" />
                <button>등록</button>
            </div>

            {post.commentsList.map((comment) => (
                <CommentItem key={comment.id} {...comment} />
            ))}
        </div>
    );
};

export default PostDetail;
