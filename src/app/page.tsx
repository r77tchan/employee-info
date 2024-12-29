import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold py-4">ようこそ、情報共有社員一覧システムへ</h1>
      <p className="py-2">ここで社員評価を管理できます。</p>
      <div>
        <Link
          href="/list"
          className="inline-block border border-gray-400 px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 hover:shadow-lg"
        >
          社員一覧を見る
        </Link>
      </div>
    </div>
  )
}
