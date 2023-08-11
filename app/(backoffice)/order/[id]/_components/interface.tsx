import { Order } from '@/lib/order/interface'

export interface OrderDetail extends Order {
  cost: number
  paymentMethod: string
  currency: string
  buyer: DeliveryUserInfo
  receiver: DeliveryUserInfo
  orderItemList: OrderDetailItem[]
}
export interface DeliveryUserInfo {
  id: string
  name: string
  email: string
  phone: string
  address: string
  isForegin: boolean
}
export interface OrderDetailItem {
  index: number
  id: string
  product: {
    image: string
    link: {
      fado: string
      origin: string
    }
    name: string
    att: Att[]
  }
  quantity: number
  weight: string[]
  price: string[]
  total: string
  status: OrderDetailItemStatus
  shippingDate: string
  note: string
  otherCost: Cost[]
}

export interface OrderDetailItemStatus {
  id: number
  name: string
}
export interface Att {
  name: string
  value: string
}
export interface Cost {
  name: string
  value: string
}
