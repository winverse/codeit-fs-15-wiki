import { Link } from 'react-router';

export function About() {
  return (
    <div className="page-content">
      <div className="page-header">
        <h1>소개 페이지</h1>
        <p>
          React Router 학습 사이트에 오신 것을 환영합니다! 이 페이지에서는 동적
          헤드 관리를 통한 SEO 최적화를 학습합니다.
        </p>
        <p>
          현재 페이지의 제목은 "소개 - React Router 학습"입니다. 브라우저 탭을
          확인해보세요.
        </p>
      </div>

      <Link to="/" className="back-link">
        홈 페이지로 이동
      </Link>
    </div>
  );
}
