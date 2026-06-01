'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import ProfilePhoto from '@/components/ProfilePhoto';
import useClickOutside from '@/hooks/useClickOutside';
import { USERNAMES } from '@/lib/constants';
import { useLoginContext } from '@/contexts/LoginContext';
import * as styles from './UserMenu.css.js';

const anonymousUserIcon = '/assets/person.png';

/*
TODO(2-06): UserMenu를 완성합니다.
- 사용자 정보 쿼리 연결
- 캐시 무효화와 로그아웃 처리
*/

function UserMenu() {
  const router = useRouter();
  const { currentUsername, setCurrentUsername } = useLoginContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleCloseMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, [setIsMenuOpen]);

  // 메뉴가 열린 상태에서 바깥 클릭을 감지해 닫습니다.
  useClickOutside({
    isActive: isMenuOpen,
    onOutsideClick: handleCloseMenu,
  });

  const handleButtonClick = (event) => {
    event.stopPropagation();
    setIsMenuOpen((nextIsOpen) => !nextIsOpen);
  };

  const handleLoginClick = (username) => {
    setCurrentUsername(username);
    router.push('/');
  };

  const handleLogoutClick = () => {
    setCurrentUsername(undefined);
    router.push('/');
  };

  return (
    <div className={styles.userMenu}>
      <button className={styles.iconButton} onClick={handleButtonClick}>
        {/* 로그인 여부에 따라 Suspense 분기 UI로 변경합니다 */}
        <ProfilePhoto
          photo={anonymousUserIcon}
          name={currentUsername || '로그인'}
        />
        <div className={styles.userName}>{currentUsername || '로그인'}</div>
      </button>
      {isMenuOpen && (
        <ul className={styles.popup}>
          {currentUsername ? (
            <li
              className={styles.popupItem}
              onClick={() => {
                handleLogoutClick();
              }}
            >
              로그아웃
            </li>
          ) : (
            USERNAMES.map((username) => (
              <li
                key={username}
                className={styles.popupItem}
                onClick={() => {
                  handleLoginClick(username);
                }}
              >
                {username}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}

export default UserMenu;
