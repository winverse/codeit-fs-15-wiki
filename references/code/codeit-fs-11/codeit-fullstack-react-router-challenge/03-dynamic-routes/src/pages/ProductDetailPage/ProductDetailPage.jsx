import { useParams, Link } from 'react-router';
import { products } from '../../data/products';
import styles from './ProductDetailPage.module.css';

export function ProductDetailPage() {
  // TODO 1: useParams 훅을 사용하여 URL로부터 productId를 가져오세요.

  // TODO 2: products 배열에서, 위에서 얻은 productId와 일치하는 상품을 찾으세요.
  // HINT: 배열의 find 메서드를 사용합니다.
  const product = [];

  // TODO 3: 만약 product가 존재하지 않는다면, 아래 "상품을 찾을 수 없습니다" 메시지를 보여주세요.
  // HINT: if (condition) {}

  return (
    <div className={styles.page}>
      <Link to="/products" className={styles.backLink}>
        ← 상품 목록으로
      </Link>
      <div className={styles.productCard}>
        <h1 className={styles.productName}>{product.name}</h1>
        <p className={styles.productPrice}>
          가격: {product.price.toLocaleString()}원
        </p>
        <p className={styles.productDescription}>{product.description}</p>
      </div>
    </div>
  );
}
