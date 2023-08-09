"use client"
import FlexBetween from '@/components/mui/flex-box/flex-between';
import FlexBox from '@/components/mui/flex-box/flex-box';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import LastPageIcon from '@mui/icons-material/LastPage';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { usePathname, useRouter } from 'next/navigation';
import { handleRouteOrderPage } from '@/lib/order/config';
import { T } from '@/components/common/typography/text';
import { SearchParams, backgroundColor } from '@/lib/config';

export const Pagination = ({ page, totalPage, numberLine, searchParams }: {
    page: number,
    totalPage: number,
    numberLine: number,
    searchParams: SearchParams
}) => {
    const pageOptions = [
        { value: 10, name: "10 dòng / trang" },
        { value: 20, name: "20 dòng / trang" },
        { value: 50, name: "50 dòng / trang" }
    ]
    const pathname = usePathname()
    const router = useRouter()
    return (
        <FlexBetween bgcolor={backgroundColor}>
            <div></div>
            <FlexBox padding={2} alignItems="center" whiteSpace="nowrap">
                <T marginRight="1rem">{(page - 1) * numberLine + 1} - {page * numberLine} / {totalPage * numberLine} dòng</T>
                <FormControl fullWidth sx={{
                    marginRight: "1rem"
                }}>
                    <Select
                        value={numberLine}
                        size='small'
                        sx={{
                            width: "fit-content",
                        }}
                    >
                        {pageOptions.map((item) => (
                            <MenuItem
                                onClick={() => {
                                    router.push(handleRouteOrderPage({
                                        currentPath: pathname,
                                        current: searchParams,
                                        input: {
                                            numberLine: item.value
                                        }
                                    }).href)
                                }}
                                value={item.value} key={item.value}>{item.name}</MenuItem>
                        ))}

                    </Select>
                </FormControl>
                <IconButton disabled={page === 1}
                    onClick={() => {
                        router.push(handleRouteOrderPage({
                            current: searchParams,
                            currentPath: pathname,
                            input: {
                                page: 1
                            }
                        }).href)
                    }}
                >
                    <FirstPageIcon />
                </IconButton>
                <IconButton disabled={page === 1}
                    onClick={() => {
                        router.push(handleRouteOrderPage({
                            current: searchParams,
                            currentPath: pathname,
                            input: {
                                page: (page - 1)
                            }
                        }).href)
                    }}>
                    <NavigateBeforeIcon />
                </IconButton>
                <Typography sx={{
                    fontWeight: 400,
                    margin: "0px 10px 0px 10px",
                    fontSize: "1rem"
                }}>{page}</Typography>
                <IconButton
                    disabled={page === totalPage}
                    onClick={() => {
                        router.push(handleRouteOrderPage({
                            current: searchParams,
                            currentPath: pathname,
                            input: {
                                page: (page + 1)
                            }
                        }).href)
                    }}>
                    <NavigateNextIcon />
                </IconButton>
                <IconButton
                    disabled={page === totalPage}
                    onClick={() => {
                        router.push(handleRouteOrderPage({
                            current: searchParams,
                            currentPath: pathname,
                            input: {
                                page: totalPage
                            }
                        }).href)
                    }}>
                    <LastPageIcon />
                </IconButton>
            </FlexBox>
        </FlexBetween>
    )
}