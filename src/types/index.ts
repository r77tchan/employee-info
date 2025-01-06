export interface Employee {
  id: number
  familyNameKanji: string
  givenNameKanji: string
  familyNameKana: string
  givenNameKana: string
  department: number
  position: number
  positive: number
  negative: number
  other: number
}

export const departments = ['開発部', '人事部', '総務部', '経理部']
export const positions = ['一般社員', 'マネージャ', '課長', '部長']

export interface Feedback {
  id: number
  employeeId: number
  feedback_type: number
  content: string
  createdAt: Date
}
