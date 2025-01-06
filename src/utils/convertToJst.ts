export default function convertToJst(isoDate: string): string {
  const utcDate = new Date(isoDate) // ISO文字列をそのままDateオブジェクトに
  return utcDate.toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' }) // JSTを直接指定
}
