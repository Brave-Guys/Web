import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ThumbsUp, MessageCircle } from 'lucide-react';
import CommentItem from '../components/CommentItem';
import { getPostDetail } from '../apis/getPostDetail';
import '../styles/PostDetail.css';

const PostDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const data = await getPostDetail(id);
                setPost(data);
            } catch (err) {
                alert('게시글을 불러오는 데 실패했습니다.');
                console.error(err);
            }
        };

        fetchPost();
    }, [id]);

    if (!post) return <p>로딩 중...</p>;

    return (
        <div className="post-detail-container">
            <h1 className="post-title">{post.name}</h1>

            <div className="post-header">
                <div className="profile-icon"></div>
                <div className="nickname">{post.nickname}</div>
                <div className="post-time">{new Date(post.createDate).toLocaleString()}</div>
                <div className="post-actions">
                    <span>수정</span>
                    <span>|</span>
                    <span>삭제</span>
                </div>
            </div>

            <div className="post-content">{post.content}</div>

            <div className="post-footer">
                <div className="reaction">
                    <ThumbsUp size={20} color="red" /> <span>{post.likes || 0}</span>
                </div>
                <div className="reaction">
                    <MessageCircle size={20} color="blue" /> <span>{post.comments?.length || 0}</span>
                </div>
            </div>

            <div className="comment-input-wrapper">
                <input type="text" placeholder="댓글을 작성하세요!" />
                <button>등록</button>
            </div>

            {post.comments?.map((comment) => (
                <CommentItem
                    key={comment._id}
                    name={comment.nickname}
                    time={new Date(comment.createDate).toLocaleString()}
                    content={comment.content}
                    likes={comment.likes || 0}
                />
            ))}
        </div>
    );
};

export default PostDetail;
