import * as React from 'react'
import Link from 'next/link'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import SearchIcon from '@mui/icons-material/Search'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import FlexRowCenter from '@/components/mui/flex-box/flex-row-center'
import { CollapseCard } from '@/components/common/card/collapse-card'
import { StyledChip } from '@/components/common/chip'
import { T } from '@/components/common/typography/text'

import { Cell } from '../../../../components/common/table'
import { Pagination } from './_components/table/paging'
import { SortIcon } from './_components/table/sort-arrow'
import { FilterForm } from './_components/filter-form'
import { backgroundColor } from '@/lib/config'
import { SearchParams } from './_components/interface'
import { getOrderList } from '@/lib/order/get-order'
import { getTagColor, getPlaceColor, getOrderStatusColor } from './_components/config'

export default async function Order({ searchParams }: { searchParams: SearchParams }) {
  const res = await getOrderList(searchParams)
  return (
    <>
      <Box marginTop='1rem'>
        <TableContainer
          component={Paper}
          sx={{
            maxHeight: '50rem',
            '::-webkit-scrollbar': {
              width: '5px'
            },
            '::-webkit-scrollbar-thumb': {
              borderRadius: '5px',
              background: '#888'
            }
          }}
        >
          {/* {res.data.length !== 0 ? ( */}
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                <Cell body={false} width='170px'>
                  Mã đơn hàng
                </Cell>
                <Cell body={false} width='100px'>
                  Khu vực
                </Cell>
                <Cell body={false} width='120px'>
                  Đối tác
                </Cell>
                <Cell body={false} width='170px'>
                  <FlexRowCenter alignItems='center'>
                    Ngày tạo đơn hàng
                    <SortIcon type='create' />
                  </FlexRowCenter>
                </Cell>
                <Cell body={false} width='210px'>
                  <FlexRowCenter alignItems='center'>
                    Ngày hoàn tất thanh toán
                    <SortIcon type='complete' />
                  </FlexRowCenter>
                </Cell>
                <Cell body={false} width='190px'>
                  Trạng thái
                </Cell>
                <Cell body={false}>Ghi chú</Cell>
              </TableRow>
            </TableHead>
            <TableBody>
              {res.data.map(row => (
                <TableRow key={row.id}>
                  <Cell>
                    <T>{row.id}</T>
                    <Link href={row.href}>
                      <SearchIcon
                        fontSize='large'
                        sx={{
                          color: 'gray'
                        }}
                      />
                    </Link>
                    <FlexRowCenter>
                      {row.tag.map(item => (
                        <StyledChip
                          label={item.name}
                          size='small'
                          color='white'
                          bgcolor={getTagColor(item.id)}
                          key={item.id}
                        />
                      ))}
                    </FlexRowCenter>
                  </Cell>
                  <Cell>
                    <StyledChip label={row.place.name} color='white' bgcolor={getPlaceColor(row.place.id)} />
                  </Cell>
                  <Cell>{row.company}</Cell>
                  <Cell>
                    {row.createDate.date}
                    <br></br>
                    {row.createDate.time}
                  </Cell>
                  <Cell>
                    {row.paymentDate.date}
                    <br></br>
                    {row.paymentDate.time}
                  </Cell>
                  <Cell>
                    <StyledChip label={row.status.name} color={getOrderStatusColor(row.status.id)} />
                  </Cell>
                  <Cell>
                    <Typography
                      sx={{
                        height: '105px',
                        overflowY: 'scroll',
                        overflowX: 'hidden',
                        textAlign: 'left',
                        '::-webkit-scrollbar': {
                          width: '5px'
                        },
                        // "::-webkit-scrollbar-track": {
                        //     borderRadius: "2px"
                        // },
                        '::-webkit-scrollbar-thumb': {
                          borderRadius: '5px',
                          background: '#888'
                        }
                      }}
                    >
                      {row.note}
                    </Typography>
                  </Cell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Pagination totalPage={res.filter.totalPage} />
      </Box>
    </>
  )
}
// ) : (
//   <FlexRowCenter bgcolor={backgroundColor} width='100%' paddingTop='1rem' fontSize='medium'>
//     Hiện tại chưa có đơn hàng nào
//   </FlexRowCenter>
// )}
