import { NextResponse } from 'next/server' // Next.js で HTTP レスポンスを生成するためのユーティリティ。
import { supabase } from '@/utils/supabaseClient' // 自作の Supabase クライアントをインポート。

export async function POST(request: Request) {
  try {
    // フロントから送信されたデータを取得
    const formData = await request.json()

    // バリデーション
    if (!formData.familyNameKanji || !formData.givenNameKanji || !formData.familyNameKana || !formData.givenNameKana) {
      return NextResponse.json({ error: '名前を入力してください' }, { status: 400 })
    }

    // Supabase にデータを挿入
    const { error } = await supabase.from('employees').insert([formData])

    if (error) {
      console.error('Supabaseエラー:', error)
      return NextResponse.json({ error: 'データ登録に失敗しました' }, { status: 500 })
    }

    return NextResponse.json({ message: 'データが登録されました！' })
  } catch (err) {
    console.error('APIエラー:', err)
    return NextResponse.json({ error: 'サーバーエラーが発生しました' }, { status: 500 })
  }
}

// GET メソッド: 特定の社員の情報を取得
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const employeeId = searchParams.get('employeeId')

    if (!employeeId) {
      return NextResponse.json({ error: '社員 ID が指定されていません' }, { status: 400 })
    }

    // Supabase から社員データを取得
    const { data, error } = await supabase.from('employees').select('*').eq('id', parseInt(employeeId, 10))

    if (error) {
      console.error('Supabase エラー:', error)
      return NextResponse.json({ error: 'データの取得に失敗しました' }, { status: 500 })
    }
    return NextResponse.json(data)
  } catch (err) {
    console.error('API エラー:', err)
    return NextResponse.json({ error: 'サーバーエラーが発生しました' }, { status: 500 })
  }
}
