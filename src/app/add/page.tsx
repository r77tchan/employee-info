'use client'

import { useState } from 'react'

export default function AddPage() {
  const [formData, setFormData] = useState({
    familyNameKanji: '',
    givenNameKanji: '',
    familyNameKana: '',
    givenNameKana: '',
    department: 0,
    position: 0,
    positive: 0,
    negative: 0,
    other: 0,
  })

  // フォームが有効かを判定する関数（コンポーネント内で呼び出しているので再レンダリングされる度に呼び出される）
  const isFormValid = () => {
    return (
      formData.familyNameKanji &&
      formData.givenNameKanji &&
      formData.familyNameKana &&
      formData.givenNameKana &&
      formData.department >= 0 &&
      formData.position >= 0
    )
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      // 動的に値を変更するために、idによって値を変更する
      // 部署、役職、ポジティブ、ネガティブ、その他は数値に変換する
      [id]:
        id === 'department' || id === 'position' || ['positive', 'negative', 'other'].includes(id)
          ? parseInt(value, 10)
          : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // サーバーの API Route にデータを送信
    const response = await fetch('/api/employees', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })

    const result = await response.json()

    if (response.ok) {
      alert(result.message)
      setFormData({
        familyNameKanji: '',
        givenNameKanji: '',
        familyNameKana: '',
        givenNameKana: '',
        department: 0,
        position: 0,
        positive: 0,
        negative: 0,
        other: 0,
      })
    } else {
      alert(result.error)
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold py-4 text-center">社員追加</h1>
      <form className="py-8 max-w-xl mx-auto w-full border rounded shadow" onSubmit={handleSubmit}>
        <div className="py-2 text-center">
          <label htmlFor="familyNameKanji" className="bg-yellow-100 py-2 inline-block w-16 border font-bold">
            <span>性</span>
          </label>
          <input
            type="text"
            id="familyNameKanji"
            className="border px-4 py-2 max-w-96 w-10/12"
            value={formData.familyNameKanji}
            onChange={handleChange}
          />
        </div>
        <div className="py-2 text-center">
          <label htmlFor="givenNameKanji" className="bg-yellow-100 py-2 inline-block w-16 border font-bold">
            <span>名</span>
          </label>
          <input
            type="text"
            id="givenNameKanji"
            className="border px-4 p-2 max-w-96 w-10/12"
            value={formData.givenNameKanji}
            onChange={handleChange}
          />
        </div>
        <div className="py-2 text-center">
          <label htmlFor="familyNameKana" className="bg-yellow-100 py-2 inline-block w-16 border font-bold">
            <span>せい</span>
          </label>
          <input
            type="text"
            id="familyNameKana"
            className="border px-4 p-2 max-w-96 w-10/12"
            value={formData.familyNameKana}
            onChange={handleChange}
          />
        </div>
        <div className="py-2 text-center">
          <label htmlFor="givenNameKana" className="bg-yellow-100 py-2 inline-block w-16 border font-bold">
            <span>めい</span>
          </label>
          <input
            type="text"
            id="givenNameKana"
            className="border px-4 p-2 max-w-96 w-10/12"
            value={formData.givenNameKana}
            onChange={handleChange}
          />
        </div>
        <div className="py-2 text-center">
          <label htmlFor="department" className="bg-yellow-100 py-2 inline-block w-16 border font-bold">
            <span>部署</span>
          </label>
          <select
            id="department"
            className="border px-3 py-2.5 max-w-96 w-10/12"
            value={formData.department}
            onChange={handleChange}
          >
            <option value="0">開発部</option>
            <option value="1">人事部</option>
            <option value="2">総務部</option>
            <option value="3">経理部</option>
          </select>
        </div>
        <div className="py-2 text-center">
          <label htmlFor="position" className="bg-yellow-100 py-2 inline-block w-16 border font-bold">
            <span>役職</span>
          </label>
          <select
            id="position"
            className="border px-3 py-2.5 max-w-96 w-10/12"
            value={formData.position}
            onChange={handleChange}
          >
            <option value="0">一般社員</option>
            <option value="1">マネージャ</option>
            <option value="2">課長</option>
            <option value="3">部長</option>
          </select>
        </div>
        <div className="text-center">
          <button
            className={`rounded px-12 py-2 mt-4 ${
              isFormValid()
                ? 'bg-green-500 text-white hover:bg-green-600 hover:shadow-lg font-bold'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            disabled={!isFormValid()}
          >
            追加
          </button>
        </div>
      </form>
    </div>
  )
}
