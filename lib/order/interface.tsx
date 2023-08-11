export interface Order {
  id: string
  href: string
  tag: Tag[]
  place: Place
  company: string
  createDate: DateTime
  paymentDate: DateTime
  status: OrderStatus
  note: string
}

export interface Tag {
  id: string
  name: string
}
export interface Place {
  id: string,
  name: string
}
export interface DateTime {
  date: string
  time: string
}
export interface OrderStatus {
  id: string,
  name: string
}
