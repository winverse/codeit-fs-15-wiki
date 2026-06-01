export const posts = [
  {
    id: '1',
    title: 'React Router 완전 정복',
    excerpt: 'React Router의 핵심 개념과 실전 예제를 한 번에 정리합니다.',
    content:
      'React Router는 SPA에서 라우팅을 담당하는 라이브러리입니다. BrowserRouter, Routes, Route, Link 같은 핵심 컴포넌트와 useParams, useNavigate 등 훅을 활용하면 페이지 전환을 부드럽게 구현할 수 있습니다. 이 글에서는 기초부터 동적 라우팅, 중첩 라우팅까지 차근차근 살펴봅니다.',
    author: '코디트',
    date: '2025-08-01',
    tags: ['react', 'router', 'spa'],
  },
  {
    id: '2',
    title: 'useParams 깊이 알아보기',
    excerpt: 'URL 파라미터를 안전하고 편리하게 사용하는 방법을 정리했습니다.',
    content:
      'useParams 훅은 URL 세그먼트에서 동적 값을 읽어오는 데 사용됩니다. 파라미터는 항상 문자열이므로 숫자 비교가 필요할 경우 변환이 필요합니다. 또한 유효하지 않은 파라미터에 대한 예외 처리도 중요합니다.',
    author: '코디트',
    date: '2025-08-07',
    tags: ['react-router', 'params'],
  },
  {
    id: '3',
    title: '동적 라우팅의 모든 것',
    excerpt:
      'URL 설계부터 라우트 구성, 에러 처리까지 동적 라우팅을 총정리합니다.',
    content:
      '동적 라우팅은 사용자, 게시글 등 리소스의 식별자를 URL에 포함시켜 다양한 화면을 하나의 라우트 정의로 처리하도록 도와줍니다. 가독성 좋은 URL과 적절한 폴백 UI 설계가 핵심입니다.',
    author: '코디트',
    date: '2025-08-12',
    tags: ['routing', 'ux'],
  },
];
