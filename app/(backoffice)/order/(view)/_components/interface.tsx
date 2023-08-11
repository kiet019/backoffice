export interface OptionProps {
  id: string
  name: string
}

export interface SearchParams {
  searchOption: string
  searchInput: string
  dateOption: string
  dateStart: string
  dateEnd: string
  partnerOption: string
  statusOption: string
  originOption: string
  page: string
  numberLine: string
  sort: 'complete' | 'create'
  isAsc: 'ASC' | 'DESC'
}
