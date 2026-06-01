export default function Page() {
  return <h1>Test Page</h1>;
}

export const getServerSideProps = async () => {
  await fetch('http://localhost:3000/api/revalidate', { method: 'POST' });
  return {
    props: {},
  };
};
