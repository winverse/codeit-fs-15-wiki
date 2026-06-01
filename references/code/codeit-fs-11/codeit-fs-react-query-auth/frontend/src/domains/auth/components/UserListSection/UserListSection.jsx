import { clsx } from "clsx";
import * as styles from "./UserListSection.css.js";

export default function UserListSection({ usersQuery, createdEmail }) {
  return (
    <div className={styles.userSection}>
      <h2 className={styles.userSectionTitle}>
        사용자 목록 (백엔드 동기화 확인)
      </h2>
      {usersQuery.isLoading && (
        <p className={styles.userHint}>사용자 목록을 불러오는 중입니다.</p>
      )}
      {usersQuery.isError && (
        <p className={clsx(styles.userHint, styles.statusError)}>
          사용자 목록 조회 실패: {usersQuery.error.message}
        </p>
      )}
      {usersQuery.isSuccess && usersQuery.data.length === 0 && (
        <p className={styles.userHint}>등록된 사용자가 없습니다.</p>
      )}

      {usersQuery.isSuccess && usersQuery.data.length > 0 && (
        <ul className={styles.userList}>
          {usersQuery.data.map((user) => {
            const isNew = user.email === createdEmail;
            return (
              <li
                key={user.id}
                className={clsx(styles.userItem, isNew && styles.userItemNew)}
              >
                <div>
                  <p className={styles.userName}>
                    {user.name ?? "(이름 없음)"}
                  </p>
                  <p className={styles.userEmail}>{user.email}</p>
                </div>
                {isNew && <span className={styles.badge}>방금 생성됨</span>}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
