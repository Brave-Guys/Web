import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getParticipantDetail } from '../apis/getParticipantDetail';
import { getChallengeDetail } from '../apis/getChallenges';
import { postReelsComment } from '../apis/postReelsComment';
import { getReelsComments } from '../apis/getReelsComments';
import LoadingOverlay from '../components/LoadingOverlay';
import DefaultAvatar from '../assets/person.png';
import PageTitle from '../components/PageTitle';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import '../styles/ParticipantDetail.css';

dayjs.extend(relativeTime);

const ParticipantDetail = () => {
  const { challengeId, participantId } = useParams();
  const navigate = useNavigate();

  const [challenge, setChallenge] = useState(null);
  const [participant, setParticipant] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [loading, setLoading] = useState(false);

  const commentListRef = useRef(null);

  // 데이터 로드
  const fetchData = async () => {
    setLoading(true);
    try {
      const challengeData = await getChallengeDetail(challengeId);
      const participantData = await getParticipantDetail(challengeId, participantId);
      const commentsData = await getReelsComments(participantId);

      setChallenge(challengeData);
      setParticipant(participantData);
      setComments(commentsData);
    } catch (error) {
      console.error(error);
      alert('데이터 로드 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [challengeId, participantId]);

  // 댓글 등록
  const handleCommentSubmit = async () => {
    if (!commentText.trim()) return;
    setLoading(true);
    try {
      await postReelsComment({
        participantId,
        content: commentText.trim(),
      });
      setCommentText('');
      const updatedComments = await getReelsComments(participantId);
      setComments(updatedComments);

      // 댓글 리스트 스크롤 최하단 이동
      commentListRef.current?.scrollTo({
        top: commentListRef.current.scrollHeight,
        behavior: 'smooth',
      });
    } catch (error) {
      console.error(error);
      alert('댓글 등록에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !challenge) return <div>로딩 중...</div>;
  if (!challenge || !participant) return <div>데이터가 없습니다.</div>;

  return (
    <div className="participant-detail-page">
      {loading && <LoadingOverlay visible={true} />}

      <PageTitle
        title={`${challenge.name} / 참가자 상세`}
        showBackArrow={true}
        onBack={() => navigate(-1)}
        description={`참가자: ${participant.nickname} | ${dayjs(participant.writeDate).fromNow()}`}
      />

      <div className="participant-detail-wrapper">
        {/* 좌측: 비디오 + 참가자 콘텐츠 */}
        <section className="participant-main">
          {participant.videoUrl && (
            <div className="participant-video-wrapper">
              <video src={participant.videoUrl} controls muted autoPlay preload="metadata" />
            </div>
          )}
          <div className="participant-detail-content">{participant.content}</div>
        </section>

        {/* 우측: 댓글 */}
        <section className="participant-comments">
          <div className="comment-form">
            <textarea
              className="comment-textarea"
              placeholder="댓글을 입력하세요."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              rows={2}
            />
            <button className="comment-submit-btn" onClick={handleCommentSubmit}>
              등록
            </button>
          </div>

          <div className="comment-list" ref={commentListRef}>
            {comments.length === 0 && <p className="no-comments">등록된 댓글이 없습니다.</p>}
            {comments.map((comment) => (
              <div key={comment.id} className="comment-item">
                <img
                  src={comment.profileImgUrl || DefaultAvatar}
                  alt="profile"
                  className="comment-avatar"
                />
                <div className="comment-body">
                  <div className="comment-header">
                    <strong className="comment-nickname">{comment.nickname}</strong>
                    <span className="comment-date">{dayjs(comment.writeDate).fromNow()}</span>
                  </div>
                  <p className="comment-content">{comment.content}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ParticipantDetail;
