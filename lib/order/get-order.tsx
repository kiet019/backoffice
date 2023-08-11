import { SearchParams } from "@/app/(backoffice)/order/(view)/_components/interface";
import { Order } from "./interface";

interface Response<T> {
    data: T,
    filter: {
        totalPage: number
    }
    error?: string
}
export const getOrderList = async(searchParams: SearchParams): Promise<Response<Order[]>> => {
    return {
        data: [],
        filter: {
            totalPage: 1000
        }
    }
}