"use client"
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import FlexBox from '@/components/mui/flex-box/flex-box';
import { SearchParams } from '@/lib/config';
import { usePathname, useRouter } from 'next/navigation';
import { handleRouteOrderPage } from '@/lib/order/config';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';

interface Props {
    searchParams: SearchParams,
    type: "Created" | "PayDate"
}
export const SortIcon = ({ searchParams, type }: Props) => {
    const router = useRouter()
    const pathname = usePathname()
    const [isHover, setIsHover] = useState<boolean>(false)

    const handleClick = () => {
        console.log(searchParams)
        if (type === 'Created' && searchParams.createdAt !== undefined) {
            return searchParams.createdAt === 'ASC' ? { createdAt: "DESC" } : { createdAt: "ASC" }
        } else if (type === 'Created' && !searchParams.createdAt) {
            return { createdAt: "ASC" }
        }
        if (type === 'PayDate' && searchParams.paymentCompletedAt !== undefined) {
            return searchParams.paymentCompletedAt === "ASC" ? { paymentCompletedAt: "DESC" } : { paymentCompletedAt: "ASC" }
        } else if (type === 'PayDate' && !searchParams.paymentCompletedAt) {
            return { paymentCompletedAt: "ASC" }
        }
        return { paymentCompletedAt: "ASC" }
    }
    const handleIcon = () => {
        if (searchParams.createdAt) {
            if (searchParams.createdAt === "ASC" && type === 'Created') {
                return <ArrowUpwardIcon fontSize='small' />
            }
            if (searchParams.createdAt === "DESC" && type === 'Created') {
                return <ArrowDownwardIcon fontSize='small' />
            }
        }
        if (searchParams.paymentCompletedAt) {
            if (searchParams.paymentCompletedAt === "ASC" && type === "PayDate") {
                return <ArrowUpwardIcon fontSize='small' />
            }
            if (searchParams.paymentCompletedAt === "DESC" && type === "PayDate") {
                return <ArrowDownwardIcon fontSize='small' />
            }
        }
        return <ArrowUpwardIcon fontSize='small' />
    }
    const handleOpacity = () => {
        if (searchParams.createdAt) {
            return type === 'Created'
        }
        if (searchParams.paymentCompletedAt) {
            return type === 'PayDate'
        }
        if (!searchParams.createdAt && !searchParams.paymentCompletedAt) {
            return type === 'PayDate'
        }
    }
    return (
        <IconButton sx={{
            height: "fit-content",
            color: "white",
            opacity: handleOpacity() ? 1 : (isHover ? 1 : 0)
        }}
            onMouseEnter={() => {
                setIsHover(true)
            }}
            onMouseLeave={() => {
                setIsHover(false)
            }}
            size="small"
            onClick={() => {
                const data = handleClick()
                const current = searchParams
                current.createdAt = undefined,
                current.paymentCompletedAt = undefined
                console.log(data)
                router.push(handleRouteOrderPage({
                    current,
                    currentPath: pathname,
                    input: {
                        paymentCompletedAt: data.paymentCompletedAt,
                        createdAt: data.createdAt
                    }
                }).href)

            }}
        >
            <FlexBox alignItems="center">{handleIcon()}</FlexBox>
        </IconButton>
    )
}