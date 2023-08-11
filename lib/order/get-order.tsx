import { OptionProps, SearchParams } from "@/app/(backoffice)/order/(view)/_components/interface";
import { Order, OrderStatus } from "./interface";
import { format, parseISO } from "date-fns";

const mapBody = (searchParams: SearchParams) => {
    let orderCode = {}
    let buyerEmail = {}
    let buyerPhone = {}
    let purchasedNote = {}
    if (searchParams.searchOption && searchParams.searchInput && searchParams.searchInput !== "") {
        switch (searchParams.searchOption ) {
            case "1": 
                orderCode = {in: searchParams.searchInput.split(",")}
                break;
            case "2": 
                purchasedNote = {like: searchParams.searchInput}
                break;
            case "3": 
                buyerPhone = {in: searchParams.searchInput.split(",")}
                break;
            case "4": 
                buyerEmail = {in: searchParams.searchInput.split(",")}
        }
    }
    let createdAt = {}
    let paymentCompletedAt = {}
    if (searchParams.dateOption && searchParams.dateStart && searchParams.dateEnd && searchParams.dateEnd !== "" && searchParams.dateStart !== "") {
        const dateOption = searchParams.dateOption.split("-")
        switch ( dateOption.length) {
            case 1: 
                dateOption[0] === "create" ? 
                    createdAt = {between: [searchParams.dateStart, searchParams.dateEnd]}:
                    paymentCompletedAt = {between: [searchParams.dateStart, searchParams.dateEnd]}
                break;
            case 2: 
                createdAt = {between: [searchParams.dateStart, searchParams.dateEnd]}
                paymentCompletedAt = {between: [searchParams.dateStart, searchParams.dateEnd]}
                break;
        }
    }
    let sort: any = { payment_completed_at: "ASC"}
    if (searchParams.sort) {
        switch (searchParams.sort) {
            case "complete": 
                sort = { payment_completed_at: searchParams.isAsc}
                break;
            case "create" : {
                sort = {created_at: searchParams.isAsc}
                break;
            }
        }
    }
    return {
        query: {
            orderCode,
        buyerEmail,
        buyerPhone,
        purchasedNote,
        partnerId: searchParams.partnerOption ? {in: searchParams.partnerOption.split("-")} : {},
        createdAt,
        paymentCompletedAt,
        listCountry: searchParams.originOption ? {like: searchParams.originOption.split("-")} : {},
        orderStatus: searchParams.statusOption ? { in: searchParams.statusOption.split("-")} : {},
        },
        page: searchParams.page ? searchParams.page : 1,
        limit: searchParams.numberLine ? searchParams.numberLine : 20,
        sort
    }
}

const mapOrderStatusToClient = (order: any) => {
    let orderStatus : OrderStatus = { id: 'new', name: 'Mới' }
    switch (order.orderStatus) {
        case 'NEW':
            orderStatus = { id: 'NEW', name: 'Mới' }
            break;
          case 'PROCESSING':
            orderStatus = { id: 'PROCESSING', name: 'Đang xử lý' }
            break;
          case 'PROCESSED':
            orderStatus = { id: 'PROCESSED', name: 'Đã xử lý' }
            break;
          case 'INTERNATIONAL_TRACKING_AVAILABLE':
            orderStatus = { id: 'INTERNATIONAL_TRACKING_AVAILABLE', name: 'Đã có tracking quốc tế' }
            break;
          case 'DELIVERED':
            orderStatus = { id: 'DELIVERED', name: 'Đã giao hàng' }
            break;
          case 'CANCELLED':
            orderStatus = { id: 'CANCELLED', name: 'Đã hủy' }
            break;
    }
    return orderStatus
}
const mappedOrderStatusToApi = (id: string) => {
    let name = 'Mới'
    switch (id) {
      case "new":
        name = 'NEW'
        break
      case "processing":
        name = 'PROCESSING'
        break
      case "processed":
        name = 'PROCESSED'
        break
      case "tracking":
        name = 'INTERNATIONAL_TRACKING_AVAILABLE'
        break
      case "completed":
        name = 'DELIVERED'
        break
      case "cancelled":
        name = 'CANCELLED'
        break
    }
    return name
  }
  
const mapOrderList = (orders: any[]) => {
    const orderList: Order[] = []
    orders.forEach((order : any) => {
        const tag: OptionProps[] = []
        order.isVat === 1 ? tag.push({ id: 'vat', name: 'VAT' }) : null
        order.isFastShipping = 1 ? tag.push({ id: 'fast', name: 'Nhanh' }) : null



        orderList.push({
            company: order.partnerId,
            createDate: {
              date: format(parseISO(order.createdAt), 'dd/MM/yyyy'),
              time: format(parseISO(order.createdAt), "hh:mm:ss")
            },
            href: `${process.env.FRONTEND_GATEWAY}order/${order.orderCode}`,
            id: order.orderCode,
            note: order.purchasesNote,
            paymentDate: {
                date: format(parseISO(order.paymentCompletedAt), 'dd/MM/yyyy'),
                time: format(parseISO(order.paymentCompletedAt), "hh:mm:ss")
            },
            place: {
              id: order.areaName === 'SG' ? 'sg' : 'hn',
              name: order.areaName
            },
            status: mapOrderStatusToClient(order),
            tag
          })
      
    })
    return orderList
}
interface Response<T> {
    data: T,
    filter: {
        totalPage: number
    }
    error?: string
}
export const getOrderList = async(searchParams: SearchParams): Promise<Response<Order[]>> => {
    console.log(mapBody(searchParams))
    try {
        const res = await fetch(`${process.env.BACKEND_GATEWAY}/order/get-list`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(mapBody(searchParams)),
            cache: "no-store"
        })
        const data = await res.json()
        const orderList = mapOrderList(data.data.orders)
        return {
            data: orderList,
            filter: {
                totalPage: data.data.totalPages
            },
    
        }
    } catch (error : any) {
        console.log(error.message)
        return {
            data: [],
            filter: {
                totalPage: 0
            },
            error: error.message
        }
    }
}