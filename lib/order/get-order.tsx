import { countryOptions, dateOptions, defaultFilter, handleChoose, statusOptions } from "./config"
import { FilterProps, Order } from "./interface"
import { OptionProps, SearchParams, baseURL, convertStringToArray, decodeNumberToText, encodeTextToNumber } from "../config"
import { format, parseISO } from "date-fns"


const mappedOrderStatusToClient = (name: string) => {
    // let status: OptionProps | undefined = undefined
    // if (name === "NEW") {
    //     status = { id: 1, name: "Mới" }
    // } else if (name === "PROCESSING") {
    //     status = { id: 2, name: "Đang xử lý" }
    // } else if (name === "PROCESSED") {
    //     status = { id: 3, name: "Đã xử lý" }
    // } else if (name === "INTERNATIONAL_TRACKING_AVAILABLE") {
    //     status = { id: 4, name: "Đã có tracking quốc tế" }
    // } else if (name = "DELIVERED") {
    //     status = { id: 5, name: "Đã giao hàng" }
    // } else if (name = "CANCELLED") {
    //     status = { id: 6, name: "Đã hủy" }
    // }
    // return status ? status : { id: 1, name: "Mới" }

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
        order.isFastShipping? tag.push({ id: 2, name: "Nhanh" }) : null
        orderList.push({
            company: order.partner_name,
            createDate: {
                date: format(parseISO(order.orders_created_at.split("T")[0]), "dd/MM/yyyy"),
                time: order.orders_created_at.split("T")[1].split(".")[0]
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
        console.log(res.info.query.search.orderCodes)
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
    res.info.query.filter.createOrderDateRanges !== undefined ? dateOption.push(2) : null

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
        dateStart: res.info.query.filter.createOrderDateRanges[0] !== undefined ?
            new Date(res.info.query.filter.createOrderDateRanges[0]) : null,
        dateEnd: res.info.query.filter.createOrderDateRanges[0] !== undefined ?
            new Date(res.info.query.filter.createOrderDateRanges[1]) : null,
        orderList
    }
    return filter
}

interface GetOrderProps {
    variables: {
        page: number,
        limit: number,
        partnerIds: string[],
        dateRange: string[],
        orderStatus: string[],

        orderCodes: string[],
        purchaseNote: string,
        buyerPhoneNumbers: string[],
        buyerEmails: string[],
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
    return {
        variables: {
            page: Number.parseInt(handleChoose(undefined, data.page, defaultFilter.page)),
            limit: Number.parseInt(handleChoose(undefined, data.numberLine, defaultFilter.numberLine)),
            partnerIds,
            orderStatus,
            dateRange: data.dateStart && data.dateEnd ? [data.dateStart, data.dateEnd] : [],
            orderCodes,
            purchaseNote,
            buyerPhoneNumbers,
            buyerEmails
        }
    }
}
export const getOrderList = async (filterFromClient: SearchParams) => {
    const filter = mappedToApi(filterFromClient)
    console.log(filter)
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
                    buyerEmails: filter.variables.buyerEmails ,

                    orderStatus: filter.variables.orderStatus,
                    createOrderDateRange: filter.variables.dateRange,
                    partnerIds: filter.variables.partnerIds
                },
                sort: {
                    createdAt: "DESC"
                }
            })
        })
        const data = await res.json()
        return {
            filter: mappedToClient(data.data)
        }
    } catch (error) {
        console.log(error)
        return {
            error
        }
    }
}