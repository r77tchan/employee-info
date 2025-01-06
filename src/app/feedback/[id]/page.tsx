// サーバーコンポーネント
import FeedbackClient from './FeedbackClient'

// フィードバックデータを取得する非同期関数
async function fetchFeedbacks(employeeId: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/feedback?employeeId=${employeeId}`, {
    cache: 'no-store', // 常に最新のデータを取得
  })
  if (!res.ok) {
    throw new Error('Failed to fetch feedbacks')
  }
  return res.json() // フィードバックデータをJSON形式で返す
}

// 従業員データを取得する非同期関数
async function fetchEmployee(employeeId: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/employees?employeeId=${employeeId}`, {
    cache: 'no-store', // 常に最新のデータを取得
  })
  if (!res.ok) {
    throw new Error('Failed to fetch employee')
  }
  return res.json() // 従業員データをJSON形式で返す
}

// 動的ルートのサーバーコンポーネント
export default async function FeedbackPage({ params }: { params: { id: string } }) {
  const resolvedParams = await params // `params` を解決
  const { id } = resolvedParams // 解決後の `id` を取得

  // 必要なデータを非同期で取得
  const feedbacks = await fetchFeedbacks(id) // 初期フィードバックデータ
  const employee = await fetchEmployee(id) // 従業員データ

  // データをクライアントコンポーネントに渡してレンダリング
  return (
    <div>
      <h1 className="text-2xl font-bold py-4 text-center">フィードバック一覧</h1>
      <FeedbackClient employee={employee} initialFeedbacks={feedbacks} />
    </div>
  )
}
