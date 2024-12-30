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
