export interface Member {
  id: string
  firstname: string
  lastname: string
  birthday?: string
  mobile?: string
}

export interface Training {
  id: string
  title: string
  dateFrom: string
  dateTo: string
  weekday: string
  section: string
  participants: Member[]
}
