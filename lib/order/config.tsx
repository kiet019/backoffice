import { OptionProps, SearchParams, baseURL } from "../config"
import { FilterProps } from "./interface"

export const options = [
    { id: 1, name: "Mã đơn hàng" },
    { id: 2, name: "Ghi chú" },
    { id: 3, name: "Số điện thoại" },
    { id: 4, name: "Email" }
]
export const companyOptions = [
    { id: 0, name: "-- Chọn đối tác --" },
    { id: 1, name: "Tiki" },
    { id: 2, name: "Lazada" },
    { id: 3, name: "Shoppee" },
    { id: 4, name: "Fado" }
]
export const placeOptions = [
    { id: 1, name: "SG" },
    { id: 2, name: "HN" }
]
export const statusOptions = [
    { id: 0, name: "-- Chọn trạng thái --" },
    { id: 1, name: "Mới" },
    { id: 2, name: "Đang xử lý" },
    { id: 3, name: "Đã xử lý" },
    { id: 4, name: "Đã có tracking quốc tế" },
    { id: 5, name: "Đã giao hàng" },
    { id: 6, name: "Đã hủy" },
]
export const countryOptions = [
    { id: 0, name: "-- Chọn nước --" },
    { id: 1, name: "VN" },
    { id: 2, name: "DE" },
    { id: 3, name: "US" },
    { id: 4, name: "UK" },
    { id: 5, name: "KH" },
]
export const dateOptions = [
    { id: 0, name: "-- Chọn loại ngày --" },
    { id: 1, name: "Ngày hoàn tất thanh toán" },
    { id: 2, name: "Ngày tạo đơn hàng" },
]
export const tag = [
    { id: 1, name: "VAT" },
    { id: 2, name: "Nhanh" }
]
export const getListOptions = (ids: number[]): OptionProps[] => {
    return options.filter((value) => ids.includes(value.id))
}
export const getOrderStatusColor = (id: number): string => {
    if (id === 1) {
        return "#ED6C02"
    } else if (id === 2) {
        return "#FF6C60"
    } else if (id === 3) {
        return "#2E7D32"
    } else if (id === 4) {
        return "#2196F3"
    } else if (id === 5) {
        return "rgba(0, 0, 0, 0.87)"
    } else {
        return "#757575"
    }
}
export const getTagColor = (id: number): string => {
    if (id === 1) {
        return "#29B6F6"
    } else {
        return "#FFCA28"
    }
}
export const getPlaceColor = (id: number): string => {
    if (id === 1) {
        return "#66BB6A"
    } else {
        return "#EC407A"
    }
}


export const defaultFilter: FilterProps = {
    searchInput: "",
    searchOption: options[0],
    searchOptions: options,
    filterOptionsList: [
        {
            filterOptions: companyOptions,
            filterOption: [],
        },
        {
            filterOptions: statusOptions,
            filterOption: [],
        },
        {
            filterOptions: countryOptions,
            filterOption: []
        },
        {
            filterOptions: dateOptions,
            filterOption: [1]
        }
    ],
    page: 1,
    totalPage: 10,
    numberLine: 20,
    dateStart: new Date(),
    dateEnd: new Date(),
    orderList: [],
}

export const handleChoose = (input: any, current: any, config: any) => {
    if (input !== undefined) {
        return input
    } else if (current !== undefined) {
        return current
    } else {
        return config
    }
}

export const handleRouteOrderPage = ({
    currentPath,
    current,
    input: {
        status,
        numberLine,
        page,
        partner,
        dateStart,
        dateEnd,
        input,
        option,
        dateOption,
        createdAt,
        paymentCompletedAt
    }
}: {
    currentPath: string,
    current: SearchParams,
    input: SearchParams
}) => {
    const filter = defaultFilter
    const url = new URL(baseURL + currentPath)
    url.searchParams.append("numberLine", handleChoose(numberLine, current.numberLine, filter.numberLine))
    url.searchParams.append("page", handleChoose(page, current.page, filter.page))
    const choosedOption = handleChoose(option, current.option, undefined)
    const choosedInput = handleChoose(input, current.input, undefined)
    const choosedStatus = handleChoose(status, current.status, undefined)
    const choosedPartner = handleChoose(partner, current.partner, undefined)
    const choosedDateStart = handleChoose(dateStart, current.dateStart, undefined)
    const choosedDateEnd = handleChoose(dateEnd, current.dateEnd, undefined)
    const choosedDateOption = handleChoose(dateOption, current.dateOption, filter.filterOptionsList[3].filterOption)
    const choosedCreatedAt = handleChoose(createdAt, current.createdAt, undefined)

    const choosedPaymentCompletedAt = handleChoose(paymentCompletedAt, current.paymentCompletedAt, undefined)
    console.log("payment", paymentCompletedAt)
    console.log("created", createdAt)

    choosedOption ? url.searchParams.append("option", choosedOption) : url.searchParams.delete("option")
    choosedInput ? url.searchParams.append("input", choosedInput) : url.searchParams.delete("input")
    choosedStatus ? url.searchParams.append("status", choosedStatus) : url.searchParams.delete("status")
    choosedPartner ? url.searchParams.append("partner", choosedPartner) : url.searchParams.delete("partner")
    choosedDateStart ? url.searchParams.append("dateStart", choosedDateStart) : url.searchParams.delete("dateStart")
    choosedDateEnd ? url.searchParams.append("dateEnd", choosedDateEnd) : url.searchParams.delete("dateEnd")
    choosedDateOption ? url.searchParams.append("dateOption", choosedDateOption) : url.searchParams.delete("dateOption")
    choosedCreatedAt ? url.searchParams.append("createdAt", choosedCreatedAt): url.searchParams.delete("createdAt")
    choosedPaymentCompletedAt ? url.searchParams.append("paymentCompletedAt", choosedPaymentCompletedAt) : url.searchParams.delete("paymentCompletedAt")
    
    if (choosedInput === "") {
        url.searchParams.delete("option")
    }
    return url
}