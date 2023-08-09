import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Cell } from '../../../components/common/table';
import { Pagination } from './_components/table/paging';
import SearchIcon from '@mui/icons-material/Search';
import FlexRowCenter from '@/components/mui/flex-box/flex-row-center';
import Link from 'next/link';
import Typography from '@mui/material/Typography';
import { SortIcon } from './_components/table/sort-arrow';
import { FilterForm } from './_components/filter-form';
import Box from '@mui/material/Box';
import { getOrderStatusColor, getPlaceColor, getTagColor } from '@/lib/order/config';
import { CollapseCard } from '@/components/common/card/collapse-card';
import { StyledChip } from '@/components/common/chip';
import { SearchParams, backgroundColor } from '@/lib/config';
import { getOrderList } from '@/lib/order/get-order';
import { T } from '@/components/common/typography/text';
import { notFound } from 'next/navigation';





export default async function Order({ searchParams }: { searchParams: SearchParams }) {
   const res = await getOrderList(searchParams)
    if (res.error !== undefined) {
        return notFound()
    }
    if (res.filter !== undefined) {
        return (
            <>
                <CollapseCard title="Tìm kiếm đơn hàng" backgroundColor={backgroundColor} padding="1rem">
                    <FilterForm filterProps={res.filter} searchParams={searchParams}/>
                </CollapseCard>
                <Box marginTop="1rem">
                    <TableContainer component={Paper} sx={{
                        maxHeight: "50rem",
                        "::-webkit-scrollbar": {
                            width: "5px",
                        },
                        "::-webkit-scrollbar-thumb": {
                            borderRadius: "5px",
                            background: "#888"
                        }
                    }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <Cell body={false} width="170px">Mã đơn hàng</Cell>
                                    <Cell body={false} width="100px">Khu vực</Cell>
                                    <Cell body={false} width="100px">Đối tác</Cell>
                                    <Cell body={false} width="210px">
                                        <FlexRowCenter alignItems="center">
                                            Ngày tạo đơn hàng<SortIcon href="/orders" />
                                        </FlexRowCenter>
                                    </Cell>
                                    <Cell body={false} width="210px">
                                        <FlexRowCenter alignItems="center">
                                            Ngày hoàn tất thanh toán<SortIcon href="/orders" />
                                        </FlexRowCenter>
                                    </Cell>
                                    <Cell body={false} width="190px">Trạng thái</Cell>
                                    <Cell body={false}>Ghi chú</Cell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {res.filter.orderList.map((row) => (
                                    <TableRow key={row.id}>
                                        <Cell>
                                            <T>{row.id}</T>
                                            <Link href={row.href}>
                                                <SearchIcon fontSize="large" sx={{
                                                    color: "gray"
                                                }} />
                                            </Link>
                                            <FlexRowCenter>
                                                {row.tag.map(item => (
                                                    <StyledChip label={item.name} size='small' color="white" bgcolor={getTagColor(item.id)} key={item.id} />
                                                ))}
                                            </FlexRowCenter>
                                        </Cell>
                                        <Cell><StyledChip label={row.place.name} color="white" bgcolor={getPlaceColor(row.place.id)} /></Cell>
                                        <Cell>{row.company}</Cell>
                                        <Cell>
                                            {row.createDate.date}<br></br>
                                            {row.createDate.time}
                                        </Cell>
                                        <Cell>
                                            {row.paymentDate.date}<br></br>
                                            {row.paymentDate.time}
                                        </Cell>
                                        <Cell>
                                            <StyledChip label={row.status.name} color={getOrderStatusColor(row.status.id)} />
                                        </Cell>
                                        <Cell>
                                            <Typography sx={{
                                                height: "105px",
                                                overflowY: "scroll",
                                                textAlign: "left",
                                                "::-webkit-scrollbar": {
                                                    width: "5px",
                                                },
                                                // "::-webkit-scrollbar-track": {
                                                //     borderRadius: "2px"
                                                // },
                                                "::-webkit-scrollbar-thumb": {
                                                    borderRadius: "5px",
                                                    background: "#888"
                                                }
                                            }}>
                                                {row.note}
                                            </Typography>
                                        </Cell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        {/* <Calendar/> */}
                    </TableContainer>
                    <Pagination numberLine={res.filter.numberLine} page={res.filter.page} totalPage={res.filter.totalPage} searchParams={searchParams}/>
                </Box>
            </>
        );
    }
}

