'use client'

import { useState } from 'react'
import { supabase } from '@/utils/supabaseClient'

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

    const { error } = await supabase.from('employees').insert([formData])

    if (error) {
      console.error('データ登録中にエラーが発生しました:', error)
    } else {
      alert('データが登録されました！')
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
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold py-4 text-center">社員追加</h1>
      <form className="py-2 max-w-xl mx-auto w-full border rounded shadow" onSubmit={handleSubmit}>
        <div className="py-2 pr-4 flex justify-between items-center">
          <label htmlFor="familyNameKanji" className="w-1/5 text-right pr-4">
            <span>性</span>
          </label>
          <input
            type="text"
            id="familyNameKanji"
            className="border rounded p-2 w-4/5"
            value={formData.familyNameKanji}
            onChange={handleChange}
          />
        </div>
        <div className="py-2 pr-4 flex justify-between items-center">
          <label htmlFor="givenNameKanji" className="w-1/5 text-right pr-4">
            <span>名</span>
          </label>
          <input
            type="text"
            id="givenNameKanji"
            className="border rounded p-2 w-4/5"
            value={formData.givenNameKanji}
            onChange={handleChange}
          />
        </div>
        <div className="py-2 pr-4 flex justify-between items-center">
          <label htmlFor="familyNameKana" className="w-1/5 text-right pr-4">
            <span>せい</span>
          </label>
          <input
            type="text"
            id="familyNameKana"
            className="border rounded p-2 w-4/5"
            value={formData.familyNameKana}
            onChange={handleChange}
          />
        </div>
        <div className="py-2 pr-4 flex justify-between items-center">
          <label htmlFor="givenNameKana" className="w-1/5 text-right pr-4">
            <span>めい</span>
          </label>
          <input
            type="text"
            id="givenNameKana"
            className="border rounded p-2 w-4/5"
            value={formData.givenNameKana}
            onChange={handleChange}
          />
        </div>
        <div className="py-2 pr-4 flex justify-between items-center">
          <label htmlFor="department" className="w-1/5 text-right pr-4">
            <span>部署</span>
          </label>
          <select
            id="department"
            className="border rounded p-2 w-4/5"
            value={formData.department}
            onChange={handleChange}
          >
            <option value="0">開発部</option>
            <option value="1">人事部</option>
            <option value="2">総務部</option>
            <option value="3">経理部</option>
          </select>
        </div>
        <div className="py-2 pr-4 flex justify-between items-center">
          <label htmlFor="position" className="w-1/5 text-right pr-4">
            <span>役職</span>
          </label>
          <select id="position" className="border rounded p-2 w-4/5" value={formData.position} onChange={handleChange}>
            <option value="0">一般社員</option>
            <option value="1">マネージャ</option>
            <option value="2">課長</option>
            <option value="3">部長</option>
          </select>
        </div>
        <div className="text-center">
          <button>追加</button>
        </div>
      </form>
    </div>
  )
}