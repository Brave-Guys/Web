import absImg from '../assets/abs.png';
import backBodyImg from '../assets/backBody.png';
import bicepsImg from '../assets/biceps.png';
import chestImg from '../assets/chest.png';
import lowerBodyImg from '../assets/lowerBody.png';
import shoulderImg from '../assets/shoulder.png';
import tricepsImg from '../assets/triceps.png';

const exerciseTips = [
    {
        title: '어깨',
        img: shoulderImg,
        tips: [
            '가벼운 무게로 워밍업을 하고 본세트 시작하기 (회전근개 부상 방지를 위한)',
            '프레스류는 상체를 고정하고 천천히 밀기',
            '반동으로 들지 말고 느리게 조절면서 들기',
            '너무 무거운 중량으로 시작하지 않기',
        ]
    },
    {
        title: '가슴',
        img: chestImg,
        tips: [
            '벤치 누울 때 가슴을 내밀고 견갑을 모으는 것이 중요하다.',
            '바벨/덤벨 모두 꾸준히 운동해주는 것이 좋다.',
            '어깨로 미는 느낌이 들면 자세를 다시 한번 생각해보기',
            '허리를 아치 형태로 만들되 과하게 꺾지 않기',
        ]
    },
    {
        title: '이두',
        img: bicepsImg,
        tips: [
            '팔꿈치를 고정하는 것이 중요하다.',
            '너무 빠르게 끌어올리지 말고 천천히 조절하는 것이 중요하다',
            '허리 반동을 최대한 쓰지 않기',
            '손목이 꺾이지 않게 주의',
        ]
    },
    {
        title: '삼두',
        img: tricepsImg,
        tips: [
            '팔꿈치를 최대한 고정해서 밀기',
            '로프 푸쉬다운은 끝까지 퍼뜨리듯 피기',
            '어깨에 힘 들어가지 않게 주의하기',
            '팔꿈치 너무 벌어지지 않게하기',
        ]
    },
    {
        title: '하체',
        img: lowerBodyImg,
        tips: [
            '스쿼트는 무릎-발끝 방향 맞춰서 하기',
            '햄스트링(허벅지 뒤) 운동도 같이 해주기',
            '발바닥 전체로 눌러서 힘주기 (앞꿈치 아님)',
            '허리 말리지 않게 하기',
            '무릎이 안쪽 또는 앞으로 붕괴되지 않게 하기기',
        ]
    },
    {
        title: '등',
        img: backBodyImg,
        tips: [
            '견갑골(날개뼈) 먼저 모으는 느낌으로 당기기',
            '팔이 아니라 "등으로" 끌어오는 감각이 중요하다',
            '허리가 꺾이지 않게 중립을 유지하기',
            '팔힘에 의존하지 않기',
        ]
    },
    {
        title: '복근',
        img: absImg,
        tips: [
            '호흡을 내쉬면서 복근을 수축하기',
            '천천히, 복근만 쥐어짜는 느낌으로 운동하기',
            '허리가 꺾이지 않게 복압을 유지하기',
            '목에 힘주지 않기 ',
        ]
    },
];

export default exerciseTips;