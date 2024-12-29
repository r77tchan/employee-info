export default function ListPage() {
  // モックデータ: 実際はAPIから取得することを想定
  const employees = [
    { id: 1, name: '山田 太郎', position: 'エンジニア' },
    { id: 2, name: '田中 花子', position: 'デザイナー' },
    { id: 3, name: '佐藤 次郎', position: 'プロジェクトマネージャー' },
  ]

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">社員一覧</h1>
      <ul className="list-disc pl-8">
        {employees.map((employee) => (
          <li key={employee.id}>
            <span className="font-semibold">{employee.name}</span> - {employee.position}
          </li>
        ))}
      </ul>
    </div>
  )
}
