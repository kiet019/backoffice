export const searchOptions = [
  { id: '1', name: 'Mã đơn hàng' },
  { id: '2', name: 'Ghi chú' },
  { id: '3', name: 'Số điện thoại' },
  { id: '4', name: 'Email' }
]
export const partnerOptions = [
  { id: '0', name: '-- Chọn đối tác --' },
  { id: '1', name: 'Tiki' },
  { id: '2', name: 'Lazada' },
  { id: '3', name: 'Shoppee' },
  { id: '4', name: 'Fado' }
]
export const placeOptions = [
  { id: 'sg', name: 'SG' },
  { id: 'hn', name: 'HN' }
]
export const statusOptions = [
  { id: '0', name: '-- Chọn trạng thái --' },
  { id: 'new', name: 'Mới' },
  { id: 'processing', name: 'Đang xử lý' },
  { id: 'processed', name: 'Đã xử lý' },
  { id: 'tracking', name: 'Đã có tracking quốc tế' },
  { id: 'completed', name: 'Đã giao hàng' },
  { id: 'canceled', name: 'Đã hủy' }
]
export const originOptions = [
  { id: '0', name: '-- Chọn nước --' },
  { id: 'vn', name: 'VN' },
  { id: 'de', name: 'DE' },
  { id: 'us', name: 'US' },
  { id: 'uk', name: 'UK' },
  { id: 'kh', name: 'KH' }
]
export const dateOptions = [
  { id: "0", name: '-- Chọn loại ngày --' },
  { id: "complete", name: 'Ngày hoàn tất thanh toán' },
  { id: "create", name: 'Ngày tạo đơn hàng' }
]
export const tag = [
  { id: 'vat', name: 'VAT' },
  { id: 'fast', name: 'Nhanh' }
]
export const sort = {
  sortType: "completedSort"
}
export const getOrderStatusColor = (id: string): string => {
  switch (id) {
    case 'new':
      return '#ED6C02'
    case 'processing':
      return '#FF6C60'
    case 'processed':
      return '#2E7D32'
    case 'tracking':
      return '#2196F3'
    case 'completed':
      return 'rgba(0, 0, 0, 0.87)'
    case 'canceled':
      return '#757575'
  }
  return '#757575'
}
export const getTagColor = (id: string): string => {
  if (id === "vat") {
    return '#29B6F6'
  } else {
    return '#FFCA28'
  }
}
export const getPlaceColor = (id: string): string => {
  if (id === "sg") {
    return '#66BB6A'
  } else {
    return '#EC407A'
  }
}
export const defaultFilter = {
  search: {
    option: searchOptions[0].id,
    input: ''
  },
  date: {
    option: [dateOptions[1].id],
    input: [null, null]
  },
  partner: {
    input: [],
  },
  status: {
    input: []
  },
  origin: {
    input: []
  },
}
