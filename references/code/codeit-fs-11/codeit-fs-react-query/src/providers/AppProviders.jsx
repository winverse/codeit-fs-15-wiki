'use client';

import { ToastContainer } from 'react-toastify';
import { LoginProvider } from '@/contexts/LoginContext';
import 'react-toastify/dist/ReactToastify.css';

const TOAST_AUTO_CLOSE_MS = 2_000;

/*
TODO(1-04): AppProviders를 완성합니다.
- QueryClient 생성
- QueryClientProvider로 감싸기
- ReactQueryDevtools 추가
*/

function AppProviders({ children }) {
  return (
    <LoginProvider>
      {children}
      <ToastContainer
        position="top-center"
        autoClose={TOAST_AUTO_CLOSE_MS}
        hideProgressBar={true}
        theme="light"
      />
    </LoginProvider>
  );
}

export default AppProviders;
