import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PageTitle from '../components/PageTitle';
import PostItem from '../components/PostItem';
import { searchPosts } from '../apis/searchPosts';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);

dayjs.locale('ko', {
    ...dayjs.Ls.ko,
    relativeTime: {
        future: '%s ',
        past: '%s ',
        s: '방금 ',
        m: '1분 ',
        mm: '%d분 ',
        h: '1시간 ',
        hh: '%d시간 ',
        d: '1일 ',
        dd: '%d일 ',
        M: '1개월 ',
        MM: '%d개월 ',
        y: '1년 ',
        yy: '%d년 '
    }
});

const SearchResult = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('query');
    const [results, setResults] = useState([]);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const data = await searchPosts(query);
                setResults(data);
            } catch (err) {
                console.error(err);
                alert('검색 결과를 불러오지 못했습니다.');
            }
        };

        if (query) fetchResults();
    }, [query]);

    return (
        <div style={{ padding: '90px 265px' }}>
            <PageTitle title={`"${query}" 검색 결과`} showBackArrow={true} />
            {results.length === 0 ? (
                <div style={{ marginTop: '30px', color: 'gray' }}>검색 결과가 없습니다.</div>
            ) : (
                results.map((post) => (
                    <PostItem
                        key={post._id}
                        postId={post._id}
                        title={post.name}
                        content={post.content}
                        trail={`${post.nickname} | ${dayjs.utc(post.createDate).tz('Asia/Seoul').fromNow()}`}
                        likeCount={post.like || 0}
                        commentCount={post.comment || 0}
                    />
                ))
            )}
        </div>
    );
};

export default SearchResult;
