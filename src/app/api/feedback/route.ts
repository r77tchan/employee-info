import { NextResponse } from 'next/server'
import { supabase } from '@/utils/supabaseClient'

// GET メソッド: 特定の社員に関連するフィードバックを取得
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const employeeId = searchParams.get('employeeId')

    if (!employeeId) {
      return NextResponse.json({ error: '社員 ID が指定されていません' }, { status: 400 })
    }

    // Supabase からフィードバックデータを取得
    const { data, error } = await supabase.from('feedback').select('*').eq('employee_id', parseInt(employeeId, 10))

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

// POST メソッド: 新しいフィードバックを追加
export async function POST(request: Request) {
  try {
    const feedback = await request.json()

    // バリデーション
    if (!feedback.employeeId || !feedback.content || !feedback.feedbackType) {
      return NextResponse.json({ error: 'リクエストが不正です' }, { status: 400 })
    }

    // Supabase に新しいフィードバックを追加
    const { data, error } = await supabase
      .from('feedback')
      .insert([
        {
          employee_id: parseInt(feedback.employeeId, 10),
          feedback_type: parseInt(feedback.feedbackType, 10),
          content: feedback.content,
        },
      ])
      .select() // 追加したデータを取得

    // employees テーブルの positive, negative, other カラムを更新
    const { data: employeeData, error: employeeError } = await supabase
      .from('employees')
      .select('positive, negative, other')
      .eq('id', parseInt(feedback.employeeId, 10))
      .single() // 配列ではなくオブジェクトで返す

    if (employeeError || !employeeData) {
      return NextResponse.json({ error: '社員データの取得に失敗しました' }, { status: 500 })
    }

    // 更新対象のカラムを判定
    const updateFields: Record<string, number> = {}

    switch (feedback.feedbackType) {
      case '0': // ポジティブ
        updateFields.positive = employeeData.positive + 1
        break
      case '1': // ネガティブ
        updateFields.negative = employeeData.negative + 1
        break
      case '2': // その他
        updateFields.other = employeeData.other + 1
        break
      default:
        return NextResponse.json({ error: '不正なフィードバックタイプです' }, { status: 400 })
    }

    // Supabaseで更新
    const { error: updateError } = await supabase
      .from('employees')
      .update(updateFields)
      .eq('id', parseInt(feedback.employeeId, 10))

    if (updateError) {
      console.error('Supabase エラー:', updateError)
      return NextResponse.json({ error: '社員データの更新に失敗しました' }, { status: 500 })
    }

    if (error) {
      console.error('Supabase エラー:', error)
      return NextResponse.json({ error: 'データの追加に失敗しました' }, { status: 500 })
    }

    return NextResponse.json({ message: 'フィードバックを追加しました', postedFeedback: data[0] }) // 追加したデータを返す
  } catch (err) {
    console.error('API エラー:', err)
    return NextResponse.json({ error: 'サーバーエラーが発生しました' }, { status: 500 })
  }
}
