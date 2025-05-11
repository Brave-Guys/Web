import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getChallengeDetail } from '../apis/getChallenges';
import { updateChallenge } from '../apis/updateChallenge';
import PageTitle from '../components/PageTitle';
import '../styles/ChallengeForm.css';

const EditChallenge = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: '',
        description: '',
        videoUrl: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getChallengeDetail(id);
                setForm({
                    name: data.name,
                    description: data.description,
                    videoUrl: data.videoUrl || '',
                });
            } catch (err) {
                console.error('챌린지 상세 불러오기 실패', err);
            }
        };

        fetchData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            await updateChallenge(id, {
                ...form,
                writerId: user.id,
            });
            alert('챌린지가 수정되었습니다.');
            navigate(`/challenges/${id}`);
        } catch (err) {
            console.error('챌린지 수정 실패', err);
            alert('수정 중 오류 발생');
        }
    };

    return (
        <div className="challenge-form-container">
            <PageTitle title="챌린지 수정" showBackArrow={true} />

            <form onSubmit={handleSubmit} className="challenge-form">
                <label>챌린지 제목</label>
                <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                />

                <label>설명</label>
                <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows={5}
                    required
                />

                <label>대표 영상 URL (선택)</label>
                <input
                    name="videoUrl"
                    value={form.videoUrl}
                    onChange={handleChange}
                />

                <button type="submit">수정 완료</button>
            </form>
        </div>
    );
};

export default EditChallenge;
