import Link from 'next/link';
import Panel from '@/components/Panel';
import {
  CHAPTER_LINKS,
  LOCAL_PRACTICE_STEPS,
} from '@/domains/posts/utils/constants';
import * as styles from './PracticeHomePage.css';

export default function PracticeHomePage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <section className={styles.hero}>
          <span className={styles.eyebrow}>Next.js TypeScript Starter</span>
          <h1 className={styles.title}>
            교재를 따라가며 타입을 완성하는 학생용 시작 프로젝트
          </h1>
          <p className={styles.lead}>
            같은 Post 데이터를 기준으로 props, 이벤트, 기본 Hook, Context,
            TanStack Query, react-hook-form 순서대로 타입을 채워 넣을 수 있도록
            학습 포인트에만 <code>any</code>를 남겨 둔 시작본입니다. 교재의 각
            장에서 지정한 파일을 수정하면서 순서대로 진행하면 됩니다.
          </p>
        </section>

        <Panel
          title="실습 체크포인트"
          description="교재의 장 흐름과 스타터 프로젝트의 수정 포인트를 맞춰 두었습니다."
        >
          <ol className={styles.steps}>
            {LOCAL_PRACTICE_STEPS.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </Panel>

        <section className={styles.grid}>
          {CHAPTER_LINKS.map((chapter) => (
            <Panel key={chapter.href}>
              <Link className={styles.linkCard} href={chapter.href}>
                <span className={styles.eyebrow}>{chapter.eyebrow}</span>
                <h2 className={styles.linkTitle}>{chapter.title}</h2>
                <p className={styles.linkDescription}>{chapter.description}</p>
              </Link>
            </Panel>
          ))}
        </section>
      </div>
    </main>
  );
}
