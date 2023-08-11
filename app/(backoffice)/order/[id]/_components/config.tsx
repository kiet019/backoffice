import { OrderDetail } from './interface'

export const orderDetail: OrderDetail = {
  id: 'AM051119-355269',
  href: '/order/AM051119-355269',
  tag: [
    { id: 'vat', name: 'VAT' },
    { id: 'fast', name: 'Nhanh' }
  ],
  place: { id: 'sg', name: 'SG' },
  company: 'fado168',
  createDate: { date: '19/02/2023', time: '10:00:00' },
  paymentDate: { date: '25/02/2023', time: '14:00:01' },
  status: { id: 'NEW', name: 'Mới' },
  note: 'mua lẹ',
  cost: 12.25,
  paymentMethod: 'Thanh toán qua FADO Pay',
  currency: '$',
  buyer: {
    email: 'tringuyen2710@gmail.com',
    id: '1',
    name: 'Trí',
    phone: '0932918960',
    address: 'Phường Vĩnh Trung, Quận Thanh Khê, Đà Nẵng',
    isForegin: false
  },
  receiver: {
    email: 'tringuyen2710@gmail.com',
    id: '1',
    name: 'Trí',
    phone: '0932918960',
    address: 'Phường Vĩnh Trung, Quận Thanh Khê, Đà Nẵng',
    isForegin: true
  },
  orderItemList: [
    {
      id: '123',
      index: 1,
      note: '',
      quantity: 5,
      weight: ['1.01 kg', '2.12 Ibs'],
      total: '$268.45',
      price: ['$203.55', '22,505'],
      status: {
        id: 1,
        name: 'Đang giao dịch'
      },
      shippingDate: '18/06/2023 - 22/06/2023',
      product: {
        link: {
          fado: 'https://fado.vn/deluxe/burberry-mini-horseferry-print-leather-and-canvas-title-bag-in-natural-malt-brown-8014611.html',
          origin:
            'https://www.farfetch.com/uk/shopping/women/burberry-mini-horseferry-print-leather-and-canvas-title-bag-item-14131666.aspx'
        },
        name: 'Mini Horseferry Print Leather And Canvas Title Bag in Natural/Malt Brown',
        att: [
          {
            name: 'Size',
            value: 'L(9-14kg) (58x3)'
          }
        ],
        image: '/img.jpg'
      },
      otherCost: [
        { name: 'Thông quan', value: '$4.07' },
        { name: 'Vận chuyển', value: '$80.07' },
        { name: 'Chiết khấu', value: '$0' },
        { name: 'Phụ phí', value: '$0' },
        { name: 'Phí ship nhanh', value: '$0' }
      ]
    },
    {
      id: '123',
      index: 2,
      note: '',
      quantity: 5,
      weight: ['1.01 kg', '2.12 Ibs'],
      total: '$268.45',
      price: ['$203.55', '22,505'],
      status: {
        id: 1,
        name: 'Đang giao dịch'
      },
      shippingDate: '18/06/2023 - 22/06/2023',
      product: {
        link: {
          fado: 'https://fado.vn/deluxe/burberry-mini-horseferry-print-leather-and-canvas-title-bag-in-natural-malt-brown-8014611.html',
          origin:
            'https://www.farfetch.com/uk/shopping/women/burberry-mini-horseferry-print-leather-and-canvas-title-bag-item-14131666.aspx'
        },
        name: 'Mini Horseferry Print Leather And Canvas Title Bag in Natural/Malt Brown',
        att: [
          {
            name: 'Size',
            value: 'L(9-14kg) (58x3)'
          }
        ],
        image: '/img.jpg'
      },
      otherCost: [
        { name: 'Thông quan', value: '$4.07' },
        { name: 'Vận chuyển', value: '$80.07' },
        { name: 'Chiết khấu', value: '$0' },
        { name: 'Phụ phí', value: '$0' },
        { name: 'Phí ship nhanh', value: '$0' }
      ]
    }
  ]
}
