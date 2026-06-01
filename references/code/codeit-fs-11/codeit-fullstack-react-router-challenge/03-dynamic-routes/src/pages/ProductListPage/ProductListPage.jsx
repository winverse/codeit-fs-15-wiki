import { Link } from 'react-router';
import { products } from '@/data/products';
import styles from './ProductListPage.module.css';

export function ProductListPage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h2>상품 목록</h2>
        <p>React Router를 사용하여 상품 목록과 상세 페이지를 구현해보세요.</p>
        <ul className={styles.productList}>
          {products.map((product) => (
            <li key={product.id} className={styles.productItem}>
              <Link
                to={`/products/${product.id}`}
                className={styles.productLink}
              >
                <h3>{product.name}</h3>
                <p>{product.price.toLocaleString()}원</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
