import styles from './ProductsPage.module.css';

export function ProductsPage() {
  return (
    <div className={styles.page}>
      <h2>Products</h2>
      <nav className={styles.nav}>
        {/* TODO: ProductsHomePage로 가는 링크를 추가하세요 (to="/products") */}
        {/* TODO: CategoryPage로 가는 링크를 추가하세요 (to="/products/category") */}
      </nav>
      <hr />
      <div className={styles.content}>
        {/* TODO: 자식 컴포넌트가 렌더링될 위치에 Outlet을 추가하세요 */}
      </div>
    </div>
  );
}
