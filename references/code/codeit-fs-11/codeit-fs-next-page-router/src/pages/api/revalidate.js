export default async function handler(req, res) {
  try {
    console.log('실행');
    // 💡 실제로는 보안 토큰을 검사해야 합니다.
    // if (req.query.secret !== process.env.MY_SECRET_TOKEN) { ... }

    // 1️⃣ 인덱스 페이지('/')를 찾아가서 다시 빌드해라! (Regeneration)
    await res.revalidate('/');

    return res.json({ revalidated: true });
  } catch (err) {
    console.error(err);
    return res.status(500).send('Error revalidating');
  }
}
