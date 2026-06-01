'use client';

import { Suspense } from 'react';
import Loading from '@/components/Loading';

/*
TODO(2-09): QueryBoundary를 완성합니다.
- ErrorBoundary 클래스 컴포넌트 추가
- DefaultErrorFallback 추가
- QueryErrorResetBoundary로 reset 연결
- pendingFallback, errorTitle, errorDescription 처리
*/

function QueryBoundary({ children, pendingFallback }) {
  return (
    <Suspense
      fallback={
        pendingFallback || (
          <Loading
            title="로딩 중입니다..."
            description="잠시만 기다려주세요."
          />
        )
      }
    >
      {children}
    </Suspense>
  );
}

export default QueryBoundary;
