import { products } from '@/data/products';
import styles from './Search.module.css';


export function SearchPage() {
  // TODO 1: useSearchParams 훅을 사용해 searchParams와 setSearchParams를 가져오세요.

  // TODO 2: URL로부터 'search'와 'orderBy' 쿼리 파라미터 값을 가져오세요.
  // HINT: searchParams.get()을 사용합니다.
  const searchTerm = null; // 'search' 파라미터
  const orderBy = null; // 'orderBy' 파라미터

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO 3: form의 'search' input 값을 가져와 search 쿼리 파라미터를 업데이트하세요.
    // HINT: formData를 이용하여 검색어를 구하고, setSearchParams({ search: `${검색어}` }); 부분을 채우시면 됩니다.
  };

  const handleSort = (sortType) => {
    // TODO 4: 기존 'search' 파라미터는 유지하면서 'orderBy' 파라미터를 업데이트하세요.
  };

  // TODO 5: searchTerm과 orderBy 값에 따라 products 배열을 필터링하고 정렬하는 로직을 구현하세요.
  const searchedProducts = []; // 이 변수에 최종 결과를 할당하세요.

  return (
    <div className="search-container">
      <h2>상품 검색</h2>
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="search"
          name="search"
          defaultValue={searchTerm || ''}
          placeholder="상품 이름을 검색하세요..."
          className="search-input"
        />
        <button type="submit" className="search-button">
          검색
        </button>
      </form>

      <div style={{ marginBottom: '1rem' }}>
        <button
          onClick={() => handleSort('price-asc')}
          disabled={orderBy === 'price-asc'}
        >
          가격 오름차순
        </button>
        <button
          onClick={() => handleSort('price-desc')}
          disabled={orderBy === 'price-desc'}
        >
          가격 내림차순
        </button>
      </div>

      <hr />

      <h3>검색 결과</h3>
      {/* TODO 6: searchTerm의 존재 여부와 searchedProducts의 길이에 따라 다른 UI를 보여주세요. */}
      <p>검색어를 입력하여 상품을 찾아보세요.</p>
    </div>
  );
}
