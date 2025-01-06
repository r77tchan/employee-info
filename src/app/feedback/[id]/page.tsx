// サーバーコンポーネント
import FeedbackClient from './FeedbackClient'

async function fetchFeedbacks(employeeId: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/feedback?employeeId=${employeeId}`, {
    cache: 'no-store', // 最新のデータを取得
  })
  if (!res.ok) {
    throw new Error('Failed to fetch feedbacks')
  }
  return res.json()
}

async function fetchEmployee(employeeId: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/employees?employeeId=${employeeId}`, {
    cache: 'no-store', // 最新のデータを取得
  })
  if (!res.ok) {
    throw new Error('Failed to fetch employee')
  }
  return res.json()
}

export default async function FeedbackPage({ params }: { params: { id: string } }) {
  // 非同期的に params を取得する
  const { id } = await Promise.resolve(params as { id: string }) // stringと明示的に指定

  const feedbacks = await fetchFeedbacks(id) // 初期データを取得

  const employee = await fetchEmployee(id) // 社員情報を取得

  return (
    <div>
      <h1 className="text-2xl font-bold py-4 text-center">フィードバック一覧</h1>
      {/* 初期データとともにクライアントコンポーネントをレンダリング */}
      <FeedbackClient employee={employee} initialFeedbacks={feedbacks} />
    </div>
  )
}
