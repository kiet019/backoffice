import { countryOptions, dateOptions, defaultFilter, handleChoose, statusOptions } from "./config"
import { FilterProps, Order } from "./interface"
import { OptionProps, SearchParams, baseURL, convertStringToArray, decodeNumberToText, encodeTextToNumber } from "../config"
import { format, parseISO } from "date-fns"


const mappedOrderStatusToClient = (name: string) => {
    let status: OptionProps = { id: 1, name: "Mới" }

    switch (name) {
        case "NEW":
            status = { id: 1, name: "Mới" }
            break;
        case "PROCESSING":
            status = { id: 2, name: "Đang xử lý" }
            break;
        case "PROCESSED":
            status = { id: 3, name: "Đã xử lý" }
            break;
        case "INTERNATIONAL_TRACKING_AVAILABLE":
            status = { id: 4, name: "Đã có tracking quốc tế" }
            break;
        case "DELIVERED":
            status = { id: 5, name: "Đã giao hàng" }
            break;
        case "CANCELLED":
            status = { id: 6, name: "Đã hủy" }
            break;
    }
    return status
}

const mappedOrderStatusToApi = (id: number) => {
    let name = "Mới"
    switch (id) {
        case 1:
            name = "NEW"
            break;
        case 2:
            name = "PROCESSING"
            break;
        case 3:
            name = "PROCESSED"
            break;
        case 4:
            name = "INTERNATIONAL_TRACKING_AVAILABLE"
            break;
        case 5:
            name = "DELIVERED"
            break;
        case 6:
            name = "CANCELLED"
            break;
    }
    return name
}
const mappedToOptionsProps = (id: string, name: string) => {
    return {
        id: +encodeTextToNumber(id),
        name: name
    }
}
const convertInput = (array: string[]) => {
    let string = ""
    array.forEach(item => string += `,${item}`)
    return string.slice(1, string.length)
}
const mappedToClient = (res: any): FilterProps => {
    const orderList: Order[] = []
    res.result.forEach((order: any) => {
        const tag: OptionProps[] = []
        order.orders_is_vat !== 0 ? tag.push({ id: 1, name: "VAT" }) : null
        order.isFastShipping ? tag.push({ id: 2, name: "Nhanh" }) : null
        orderList.push({
            company: order.partner_name,
            createDate: {
                date: format(parseISO(order.orders_payment_completed_at.split("T")[0]), "dd/MM/yyyy"),
                time: order.orders_payment_completed_at.split("T")[1].split(".")[0]
            },
            href: `${baseURL}order/${order.orders_order_code}`,
            id: order.orders_order_code,
            note: order.orders_purchases_note,
            paymentDate: {
                date: format(parseISO(order.orders_updated_at.split("T")[0]), "dd/MM/yyyy"),
                time: order.orders_updated_at.split("T")[1].split(".")[0]
            },
            place: {
                id: order.orders_area_name === "SG" ? 1 : 2,
                name: order.orders_area_name
            },
            status: mappedOrderStatusToClient(order.orderStatus),
            tag
        })
    })
    let searchOption: OptionProps = defaultFilter.searchOption
    let searchInput: string = ""
    if (res.info.query.search.orderCodes.length > 0) {
        searchOption = { id: 1, name: "Mã đơn hàng" }
        searchInput = convertInput(res.info.query.search.orderCodes)
    } else if (res.info.query.search.purchaseNote !== '') {
        searchOption = { id: 2, name: "Ghi chú" }
        searchInput = res.info.query.search.purchaseNote
    } else if (res.info.query.search.buyerPhoneNumbers.length > 0) {
        searchOption = { id: 3, name: "Số điện thoại" }
        searchInput = convertInput(res.info.query.search.buyerPhoneNumbers)
    } else if (res.info.query.search.buyerEmails.length > 0) {
        searchOption = { id: 4, name: "Email" }
        searchInput = convertInput(res.info.query.search.buyerEmails)
    }
    const partnerOptions: OptionProps[] = []
    res.info.query.filter.partners.forEach((partner: any) => {
        partnerOptions.push(mappedToOptionsProps(partner.partnerId, partner.partnerName))
    })

    const partnerSelectedOption: number[] = []
    res.info.query.filter.partnerSelected.forEach((partnerId: string) => {
        partnerSelectedOption.push(+encodeTextToNumber(partnerId))
    })
    const statusSelectedOption: number[] = []
    res.info.query.filter.orderStatuses.forEach((orderStatus: string) => {
        statusSelectedOption.push(mappedOrderStatusToClient(orderStatus).id)
    })
    const dateOption: number[] = []
    res.info.query.filter.paymentCompleteDateRanges !== undefined ? dateOption.push(1) : null
    res.info.query.filter.createOrderDateRanges !== undefined ? dateOption.push(2) : null
    let dateRange: any[] = []
    res.info.query.filter.paymentCompleteDateRanges !== undefined ? dateRange = [...res.info.query.filter.paymentCompleteDateRanges] : null
    res.info.query.filter.createOrderDateRanges !== undefined ? dateRange = [...res.info.query.filter.createOrderDateRanges] : null
    const filter: FilterProps = {
        page: res.info.page,
        totalPage: res.info.totalPages,
        numberLine: res.info.limit,
        searchOptions: defaultFilter.searchOptions,
        searchOption,
        searchInput,
        filterOptionsList: [
            {
                filterOptions: [{ id: 0, name: "-- Chọn đối tác --" }, ...partnerOptions],
                filterOption: partnerSelectedOption,
            },
            {
                filterOptions: statusOptions,
                filterOption: statusSelectedOption
            },
            {
                filterOptions: countryOptions,
                filterOption: []
            },
            {
                filterOptions: dateOptions,
                filterOption: dateOption
            }
        ],
        dateStart: new Date(dateRange[0]),
        dateEnd: new Date(dateRange[1]),
        orderList
    }
    return filter
}

interface GetOrderProps {
    variables: {
        page: number,
        limit: number,
        partnerIds: string[],
        orderStatus: string[],

        orderCodes: string[],
        purchaseNote: string,
        buyerPhoneNumbers: string[],
        buyerEmails: string[],

        dateOption: {
            paymentCompleteDateRange?: string[]
            createOrderDateRange?: string[]
        }
    }
}

const mappedToApi = (data: SearchParams): GetOrderProps => {
    const partnerIds: string[] = []
    convertStringToArray(data.partner as string).forEach((id: string) => {
        const partnerId = decodeNumberToText(id)
        partnerIds.push(partnerId)
    })
    const orderStatus: string[] = []
    convertStringToArray(data.status as string).forEach((id: string) => {
        const status = mappedOrderStatusToApi(+id)
        orderStatus.push(status)
    })
    let orderCodes: string[] = []
    let purchaseNote: string = ""
    let buyerPhoneNumbers: string[] = []
    let buyerEmails: string[] = []

    switch (data.option) {
        case "1":
            orderCodes = [...orderCodes, ...data.input?.split(",") as string[]]
            break;
        case "2":
            purchaseNote = data.input as string
            break;
        case "3":
            buyerPhoneNumbers = [...buyerPhoneNumbers, ...data.input?.split(",") as string[]]
            break;
        case "4":
            buyerEmails = [...buyerPhoneNumbers, ...data.input?.split(",") as string[]]
            break;
    }
    let dateOption = {}
    const dateSelected = convertStringToArray(data.dateOption)
    const dateRange = data.dateStart && data.dateEnd ? [data.dateStart, data.dateEnd] : []
    switch (dateSelected.length) {
        case 0:
            dateOption = { paymentCompleteDateRange: dateRange }
            break;
        case 1:
            dateSelected[0] === "1" ?
                dateOption = { paymentCompleteDateRange: dateRange } :
                dateOption = { createOrderDateRange: dateRange }
            break;
        case 2:
            dateOption = {
                paymentCompleteDateRange: dateRange,
                createOrderDateRange: dateRange
            }
            break;
    }
    return {
        variables: {
            page: Number.parseInt(handleChoose(undefined, data.page, defaultFilter.page)),
            limit: Number.parseInt(handleChoose(undefined, data.numberLine, defaultFilter.numberLine)),
            partnerIds,
            orderStatus,
            orderCodes,
            purchaseNote,
            buyerPhoneNumbers,
            buyerEmails,
            dateOption
        }
    }
}
export const getOrderList = async (filterFromClient: SearchParams) => {
    const filter = mappedToApi(filterFromClient)
    try {
        const res = await fetch("http://localhost:3003/orders/getFilteredList", {
            method: "POST",
            cache: "no-store",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                page: filter.variables.page,
                limit: filter.variables.limit,
                filter: {
                    orderCodes: filter.variables.orderCodes,
                    purchaseNote: filter.variables.purchaseNote,
                    buyerPhoneNumbers: filter.variables.buyerPhoneNumbers,
                    buyerEmails: filter.variables.buyerEmails,

                    orderStatus: filter.variables.orderStatus,
                    partnerIds: filter.variables.partnerIds,
                    ...filter.variables.dateOption,
                },
                sort: {
                    // createdAt: "DESC"
                    paymentCompletedAt: "ASC"
                }
            })
        })
        const data = await res.json()
        console.log(data.data.info.query.filter)
        return {
            filter: mappedToClient(data.data)
            // filter: defaultFilter
        }
    } catch (error) {
        console.log(error)
        return {
            error
        }
    }
}