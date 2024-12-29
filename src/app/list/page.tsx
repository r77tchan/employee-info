import Link from 'next/link'

export default function ListPage() {
  // モックデータ: 実際はAPIから取得することを想定
  const employees = [
    {
      id: 1,
      familyNameKanji: '佐藤',
      givenNameKanji: '明',
      familyNameKana: 'さとう',
      givenNameKana: 'あきら',
      department: '営業部',
      position: '一般社員',
      positive: 3,
      negative: 1,
      other: 0,
    },
    {
      id: 2,
      familyNameKanji: '佐藤',
      givenNameKanji: '明',
      familyNameKana: 'さとう',
      givenNameKana: 'あきら',
      department: '営業部',
      position: '一般社員',
      positive: 3,
      negative: 1,
      other: 0,
    },
    {
      id: 3,
      familyNameKanji: '佐藤',
      givenNameKanji: '明',
      familyNameKana: 'さとう',
      givenNameKana: 'あきら',
      department: '営業部',
      position: '一般社員',
      positive: 3,
      negative: 1,
      other: 0,
    },
  ]

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
                <ruby>
                  {employee.familyNameKanji}
                  <rt className="text-gray-500">{employee.familyNameKana}</rt>
                </ruby>
                <ruby>
                  {employee.givenNameKanji}
                  <rt className="text-gray-500">{employee.givenNameKana}</rt>
                </ruby>
              </td>
              <td className="border py-4">{employee.department}</td>
              <td className="border py-4">{employee.position}</td>
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
