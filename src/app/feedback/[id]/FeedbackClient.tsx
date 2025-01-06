'use client'

import { useState } from 'react'
import { Employee, Feedback, departments, positions } from '@/types'
import convertToJst from '@/utils/convertToJst'

export default function FeedbackClient({
  employee,
  initialFeedbacks,
}: {
  employee: Employee[]
  initialFeedbacks: Feedback[]
}) {
  const [feedbacks, setFeedbacks] = useState(initialFeedbacks) // 初期データを状態に設定
  const [newFeedback, setNewFeedback] = useState('')
  const [feedbackType, setFeedbackType] = useState('0')

  let lastDate = ''

  // フィードバックの種類を変更
  const handleFeedbackTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFeedbackType(e.target.value)
  }

  // フィードバックの投稿
  const handlePostFeedback = async () => {
    if (!newFeedback.trim()) return

    const res = await fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ employeeId: employee[0].id, content: newFeedback, feedbackType }),
    })

    if (res.ok) {
      const { postedFeedback } = await res.json()
      console.log(postedFeedback)

      setFeedbacks((prev) => [...prev, postedFeedback]) // 最新のフィードバックを追加
      setNewFeedback('') // 入力フィールドをリセット
    } else {
      console.error('投稿エラー:', await res.json())
    }
  }

  return (
    <div>
      <table className="m-4 text-center max-w-2xl w-11/12">
        <tbody>
          <tr>
            <th className="border border-gray-500 bg-blue-100 py-2">社員名</th>
            <td className="border border-gray-500 py-2">{`${employee[0].familyNameKanji} ${employee[0].givenNameKanji}`}</td>
          </tr>
          <tr>
            <th className="border border-gray-500 bg-blue-100 py-2">部署</th>
            <td className="border border-gray-500 py-2">{departments[employee[0].department]}</td>
            <th className="border border-gray-500 bg-blue-100 py-2">役職</th>
            <td className="border border-gray-500 py-2">{positions[employee[0].position]}</td>
          </tr>
        </tbody>
      </table>

      <hr className="mx-4 my-6" />

      {feedbacks.length !== 0 && (
        <>
          <div className="bg-gray-50 border mx-4">
            {feedbacks.map((feedback) => {
              // フィードバックの種類によってクラスを変更
              const feedbackClass =
                feedback.feedback_type === 0
                  ? 'text-blue-500'
                  : feedback.feedback_type === 1
                  ? 'text-red-500'
                  : 'text-black'

              const feedbackDate = feedback.created_at.slice(0, 10) // 日付部分のみ抽出
              const isNewDate = lastDate !== feedbackDate // 新しい日付かどうかを判定
              if (isNewDate) {
                lastDate = feedbackDate // 新しい日付を記録
              }

              return (
                <div key={feedback.id}>
                  {/* 新しい日付なら日付を表示 */}
                  {isNewDate && (
                    <div className="font-bold text-center py-2">{convertToJst(feedback.created_at).slice(0, 9)}</div>
                  )}
                  <div className="border border-gray-500 rounded py-4 m-4 bg-white">
                    <p className="font-bold pl-10">{convertToJst(feedback.created_at)} ↩️</p>
                    <hr className="m-2" />
                    <p className={`px-4 ${feedbackClass}`}>{feedback.content}</p>
                  </div>
                </div>
              )
            })}
          </div>
          <hr className="mx-4 my-6" />
        </>
      )}

      <div className="m-4">
        <input
          type="radio"
          name="type"
          id="positive"
          value={0}
          onChange={handleFeedbackTypeChange}
          checked={feedbackType === '0'}
        />
        <label htmlFor="positive" className="font-bold text-blue-500">
          ポジティブ
        </label>
        <input
          type="radio"
          name="type"
          id="negative"
          value={1}
          onChange={handleFeedbackTypeChange}
          checked={feedbackType === '1'}
        />
        <label htmlFor="negative" className="font-bold text-red-500">
          ネガティブ
        </label>
        <input
          type="radio"
          name="type"
          id="other"
          value={2}
          onChange={handleFeedbackTypeChange}
          checked={feedbackType === '2'}
        />
        <label htmlFor="other" className="font-bold">
          その他
        </label>
        <textarea
          className="border w-full p-2 rounded mb-2 border-gray-500"
          rows={4}
          value={newFeedback}
          onChange={(e) => setNewFeedback(e.target.value)}
          placeholder="フィードバックを入力してください"
        />
        <button
          className="bg-green-500 text-white px-10 py-2 rounded"
          onClick={handlePostFeedback}
          disabled={!newFeedback.trim()}
        >
          投稿
        </button>
      </div>
    </div>
  )
}
