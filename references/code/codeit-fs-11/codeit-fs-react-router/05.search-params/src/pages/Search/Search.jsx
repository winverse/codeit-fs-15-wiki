import styles from './Search.module.css';

const questions = [
  'React Router가 무엇인가요?',
  'useParams는 언제 사용하나요?',
  'useSearchParams와 useParams의 차이점은?',
  'React의 장점은 무엇인가요?',
];

export function Search() {
  const query = null;
  const sort = null;

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const searchQuery = formData.get('q');
    const nextParams = {};

    if (searchQuery) {
      nextParams.q = searchQuery;
    }
  };

  const handleSort = (sort) => {};

  const filteredQuestions = [];

  return (
    <div className={styles.page}>
      <h2>질문 검색</h2>
      <form onSubmit={handleSubmit}>
        <input type="search" name="q" defaultValue={query || ''} />
        <button type="submit">검색</button>
      </form>

      <div style={{ marginTop: '1rem' }}>
        <button onClick={() => handleSort('asc')} disabled={sort === 'asc'}>
          오름차순 정렬
        </button>
        <button onClick={() => handleSort('desc')} disabled={sort === 'desc'}>
          내림차순 정렬
        </button>
      </div>

      <hr />

      <h3>검색 결과</h3>
      <p>검색어를 입력해주세요.</p>
    </div>
  );
}
