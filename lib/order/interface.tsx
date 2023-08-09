
export interface FilterProps {
    searchOptions: OptionProps[]
    searchOption: OptionProps
    searchInput: string,
    filterOptionsList: FilterOption[],
    orderList: Order[],
    page: number, 
    totalPage: number,
    numberLine: number,
    dateStart: Date | null,
    dateEnd: Date | null
}

export interface FilterOption {
    filterOptions: OptionProps[],
    filterOption: number[]
}

export interface OptionProps {
    id: number,
    name: string
}

export interface Tag {
    id: number,
    name: string,
}

export interface Place {
    id: number,
    name: string,
}

export interface OrderStatus {
    id: number,
    name: string,
}

export interface CustomDate {
    date: string,
    time: string
}
export interface Order {
    id: string,
    href: string,
    tag: Tag[],
    place: Place,
    company: string,
    createDate: CustomDate,
    paymentDate: CustomDate,
    status: OrderStatus,
    note: string
}
export interface DeliveryUserInfo {
    id: string,
    name: string,
    email: string,
    phone: string,
    address: string,
    isForegin?: boolean
}