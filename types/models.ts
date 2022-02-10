export interface Member {
  id: string
  firstname: string
  lastname: string
}

export interface Training {
  id: string
  title: string
  dateFrom: Date | null
  dateTo: Date | null
  section: string
  participants: Member[]
}
