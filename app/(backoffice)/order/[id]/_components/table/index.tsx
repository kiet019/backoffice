'use client'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import Checkbox from '@mui/material/Checkbox'
import { OrderDetailItem } from '../interface'
import Image from 'next/image'
import EditIcon from '@mui/icons-material/Edit'
import Grid from '@mui/material/Grid'
import { useState } from 'react'
import { ImagePopup } from './view-image'
import Tooltip from '@mui/material/Tooltip'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import FlexBetween from '@/components/mui/flex-box/flex-between'
import Popover from '@mui/material/Popover'
import Link from 'next/link'
import MenuItem from '@mui/material/MenuItem'
import FlexBox from '@/components/mui/flex-box/flex-box'
import { Cell } from '@/components/common/table'
import { T } from '@/components/common/typography/text'
import { StyledButton } from '@/components/common/button'

export const OrderDetailTable = ({ orderItemList }: { orderItemList: OrderDetailItem[] }) => {
  const [open, setOpen] = useState<boolean>(false)
  const [image, setImage] = useState<string>('')
  const [selected, setSelected] = useState<number[]>([])
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null)
  const [viewLink, setViewLink] = useState<string[]>(['#', '#'])

  const handleOpenImage = (href: string) => {
    setOpen(true)
    setImage(href)
  }
  const getAllOrderIndex = () => {
    const list: number[] = []
    orderItemList.forEach(item => {
      list.push(item.index)
    })
    return list
  }
  return (
    <TableContainer
      component={Paper}
      sx={{
        overflowY: 'hidden',
        '::-webkit-scrollbar': {
          height: '5px'
        },
        '::-webkit-scrollbar-thumb': {
          borderRadius: '5px',
          background: '#888'
        }
      }}
    >
      <Table
        aria-label='customized table'
        sx={{
          minWidth: '2000px',
          overflowX: 'hidden'
        }}
      >
        <TableHead>
          <TableRow>
            <Cell body={false} width='10px'>
              <Checkbox
                color='success'
                sx={{ color: 'white', width: '10px' }}
                checked={orderItemList.length === selected.length}
                onChange={(e, checked) => {
                  if (checked === true) {
                    const list = getAllOrderIndex()
                    setSelected(list)
                  } else {
                    setSelected([])
                  }
                }}
              />
            </Cell>
            <Cell body={false} width='20px'>
              STT
            </Cell>
            <Cell body={false} width='60px'>
              Mã item
            </Cell>
            <Cell body={false} width='250px'>
              Sản phẩm
            </Cell>
            <Cell body={false} width='80px'>
              Thuộc tính sản phẩm
            </Cell>
            <Cell body={false} width='40px'>
              SL
            </Cell>
            <Cell body={false} width='70px'>
              KL
            </Cell>
            <Cell body={false} width='70px'>
              Giá sau thuế Mỹ
            </Cell>
            <Cell body={false} width='120px'>
              Các loại phí
            </Cell>
            <Cell body={false} width='65px'>
              Tổng
            </Cell>
            <Cell body={false} width='120px'>
              Trạng thái
            </Cell>
            <Cell body={false} width='120px'>
              Ngày dự kiến giao hàng
            </Cell>
            <Cell body={false} width='100px'>
              Ghi chú item
            </Cell>
            <Cell body={false} width='140px'>
              Hành động
            </Cell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orderItemList.map(row => (
            <TableRow key={row.index}>
              <Cell padding='5px 0px'>
                <Checkbox
                  color='success'
                  sx={{ color: 'black', width: '10px' }}
                  checked={selected.find(value => value === row.index) !== undefined}
                  onChange={(e, checked) => {
                    if (checked === true) {
                      setSelected([...selected, row.index])
                    } else {
                      setSelected(selected.filter((index: number) => !(row.index === index)))
                    }
                  }}
                />
              </Cell>
              <Cell>
                <T marginTop={3}>{row.index}</T>
              </Cell>
              <Cell>
                <T marginTop={3}>{row.id}</T>
              </Cell>
              <Cell>
                <FlexBox>
                  <Tooltip disableFocusListener title='Nhấn để mở rộng ảnh' placement='bottom-start'>
                    <Image
                      onClick={() => handleOpenImage(row.product.image)}
                      alt=''
                      src={row.product.image}
                      width={70}
                      height={70}
                      style={{ cursor: 'pointer' }}
                    />
                  </Tooltip>
                  <div
                    style={{
                      cursor: 'pointer'
                    }}
                    onClick={e => {
                      setAnchorEl(e.currentTarget)
                      setViewLink([row.product.link.fado, row.product.link.origin])
                    }}
                  >
                    <T marginTop={2} textAlign='left' color='#1E88E5'>
                      {row.product.name}
                    </T>
                  </div>
                </FlexBox>
              </Cell>
              <Cell>
                <T textAlign='left'>
                  {row.product.att.map((item, key) => (
                    <div key={key}>
                      {item.name}: <br></br>
                      {item.value}
                    </div>
                  ))}
                </T>
              </Cell>
              <Cell>
                <T fontWeight={500} marginTop={3}>
                  {row.quantity}
                </T>
              </Cell>
              <Cell>
                {row.weight.map((item, key) => (
                  <T
                    fontWeight={700}
                    marginTop={key === 0 ? 3 : 0}
                    color={key !== 0 ? 'rgba(0, 0, 0, 0.60)' : 'black'}
                    key={key}
                  >
                    {item}
                  </T>
                ))}
              </Cell>
              <Cell>
                {row.price.map((item, key) => (
                  <T
                    fontWeight={700}
                    marginTop={key === 0 ? 3 : 0}
                    color={key !== 0 ? 'rgba(0, 0, 0, 0.60)' : 'black'}
                    key={key}
                  >
                    {item}
                  </T>
                ))}
              </Cell>
              <Cell>
                {row.otherCost.map((item, key) => (
                  <T textAlign={'left'} marginTop={0} key={key}>
                    {item.name}: <span style={{ fontWeight: 700 }}>{item.value}</span>
                  </T>
                ))}
                <T textAlign={'left'} fontWeight={700} color='#D32F2F'>
                  Tổng phí: $84.14
                </T>
              </Cell>
              <Cell>
                <T fontWeight={700} marginTop={3}>
                  {row.total}
                </T>
              </Cell>
              <Cell>
                <T marginTop={3}>{row.status.name}</T>
              </Cell>
              <Cell>
                <T marginTop={3}>{row.shippingDate}</T>
              </Cell>
              <Cell position='relative'>
                <EditIcon sx={{ position: 'absolute', right: 0, top: 0 }} />
              </Cell>
              <Cell>
                <Grid container spacing={1} marginTop={3}>
                  <Grid item xs={12}>
                    <StyledButton variant='outlined' fullWidth>
                      Xác nhận hoàn thành
                    </StyledButton>
                  </Grid>
                  <Grid item xs={7}>
                    <StyledButton variant='outlined' fullWidth>
                      <FlexBetween alignItems={'center'}>
                        Tracking
                        <ArrowDropDownIcon />
                      </FlexBetween>
                    </StyledButton>
                  </Grid>
                  <Grid item xs={5}>
                    <StyledButton variant='outlined' fullWidth>
                      <FlexBetween alignItems={'center'}>
                        Link
                        <ArrowDropDownIcon />
                      </FlexBetween>
                    </StyledButton>
                  </Grid>
                </Grid>
              </Cell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ImagePopup imageHref={image} open={open} setOpen={setOpen} />
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => {
          setAnchorEl(null)
        }}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'left'
        }}
      >
        {optionLink.map(item => (
          <MenuItem key={item.id}>
            <Link
              target='_blank'
              style={{
                color: '#1E88E5'
              }}
              href={viewLink[item.id]}
            >
              {item.name}
            </Link>
          </MenuItem>
        ))}
      </Popover>
    </TableContainer>
  )
}

const optionLink = [
  { id: 0, name: 'Link từ đối tác' },
  { id: 1, name: 'Link từ nhà cung cấp' }
]
