import { supabase } from '@/utils/supabaseClient'
import Link from 'next/link'

export default async function ListPage() {
  // Supabaseからデータを取得
  const { data: employees, error } = await supabase.from('employees').select('*')

  if (error) {
    console.error('データ取得中にエラーが発生しました:', error)
    return <div>データ取得中にエラーが発生しました</div>
  }

  const departments = ['開発部', '人事部', '総務部', '経理部']
  const positions = ['一般社員', 'マネージャ', '課長', '部長']

  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold py-4">社員一覧</h1>
      <table className="py-2 max-w-5xl mx-auto w-full">
        <thead>
          <tr>
            <th className="border py-4">ID</th>
            <th className="border py-4">氏名</th>
            <th className="border py-4">部署</th>
            <th className="border py-4">役職</th>
            <th className="border py-4">ポジ</th>
            <th className="border py-4">ネガ</th>
            <th className="border py-4">その他</th>
            <th className="border py-4">詳細</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td className="border py-4">{employee.id}</td>
              <td className="border py-4">
                <ruby className="mr-1">
                  {employee.familyNameKanji}
                  <rt className="text-gray-500">{employee.familyNameKana}</rt>
                </ruby>
                <ruby>
                  {employee.givenNameKanji}
                  <rt className="text-gray-500">{employee.givenNameKana}</rt>
                </ruby>
              </td>
              <td className="border py-4">{departments[employee.department]}</td>
              <td className="border py-4">{positions[employee.position]}</td>
              <td className="border py-4">{employee.positive}</td>
              <td className="border py-4">{employee.negative}</td>
              <td className="border py-4">{employee.other}</td>
              <td className="border py-4">
                <Link
                  href="/"
                  className="inline-block border border-gray-400 px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 hover:shadow-lg"
                >
                  確認
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
