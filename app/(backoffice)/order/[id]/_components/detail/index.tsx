import FlexBetween from "@/components/mui/flex-box/flex-between"
import FlexBox from "@/components/mui/flex-box/flex-box"
import { OrderDetail } from "../interface"
import Chip from "@mui/material/Chip"
import { StyledChip } from "@/components/common/chip"
import { FieldData } from "@/components/common/field-data"
import { T } from "@/components/common/typography/text"
import { getOrderStatusColor, getPlaceColor, getTagColor } from "@/lib/order/config"

export const OrderDetailCard = ({ orderDetail }: {
    orderDetail: OrderDetail
}) => {
    return (
        <FlexBetween marginRight={5} alignItems="baseline">
            <div>
                <FieldData name="Mã đơn hàng">
                    <T fontWeight={500}>{orderDetail.id}</T>
                </FieldData>
                <FieldData name="Trạng thái">
                    <StyledChip size="small" label={orderDetail.status.name} color={getOrderStatusColor(orderDetail.status.id)} />
                </FieldData>
            </div>
            <div>
                <FieldData name="Đối tác">
                    <T fontWeight={500}>{orderDetail.company}</T>
                </FieldData>
                <FieldData name="Khu vực">
                    <StyledChip size="small" label={orderDetail.place.name} color={"white"} backgroundColor={getPlaceColor(orderDetail.place.id)} />
                </FieldData>
                <FlexBox alignItems={"center"} marginTop={0.5}>
                    <StyledChip size="small" label={orderDetail.tag[0].name} color={"white"} backgroundColor={getTagColor(orderDetail.tag[0].id)} />
                    <Chip sx={{
                        borderRadius: "6px",
                        backgroundColor: "#FFF",
                        boxShadow: "1px 2px 3px 1px rgba(0, 0, 0, 0.25) inset",
                        marginLeft: "5px",
                        color: "#C62828",
                        fontWeight: 700,
                        fontSize: "15px"
                    }} label={orderDetail.currency + orderDetail.cost} />
                </FlexBox>
            </div>
            <div>
                <FieldData name="Ngày tạo đơn hàng">
                    <T fontWeight={500}>{orderDetail.createDate.date} {orderDetail.createDate.time}</T>
                </FieldData>
                <FieldData name="Ngày hoàn tất thanh toán">
                    <T fontWeight={500}>{orderDetail.paymentDate.date} {orderDetail.paymentDate.time}</T>
                </FieldData>
                <FieldData name="Hình thức thanh toán">
                    <T fontWeight={700} color="#2E7D32">{orderDetail.paymentMethod}</T>
                </FieldData>
            </div>
        </FlexBetween>
    )
}

