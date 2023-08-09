import Grid from "@mui/material/Grid";
import { OrderDetailCard } from "./_components/detail";
import { DeliveryUserInfoCard } from "./_components/detail/delivery-detail";
import { OrderDetailTable } from "./_components/table";
import Card from "@mui/material/Card";
import { orderDetail } from "./_components/config";
import { CollapseCard } from "@/components/common/card/collapse-card";
import { backgroundColor } from "@/lib/config";
import { T } from "@/components/common/typography/text";
import { Title } from "@/components/common/typography/title";


export default function Detail() {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <CollapseCard padding={2} title="Thông tin đơn hàng" bgcolor={backgroundColor}>
                    <OrderDetailCard orderDetail={orderDetail} />
                </CollapseCard>
            </Grid>
            <Grid item xs={6}>
                <CollapseCard defaultOpen={false} padding={2} title="Thông tin nguời đặt hàng" bgcolor={backgroundColor}>
                    <DeliveryUserInfoCard deliveryUserInfo={orderDetail.buyer} isHiddenCheckbox={true}/>
                </CollapseCard>
            </Grid>
            <Grid item xs={6}>
                <CollapseCard defaultOpen={false} padding={2} title="Thông tin người nhận hàng" bgcolor={backgroundColor}>
                    <DeliveryUserInfoCard deliveryUserInfo={orderDetail.receiver} />
                </CollapseCard>
            </Grid>
            <Grid item xs={12}>
                <div style={{
                    background: "rgba(0, 0, 0, 0.22)",
                    width: "100%",
                    height: "4px"
                }} />
            </Grid>
            <Grid item xs={12}>
                <Title marginLeft={2}>Thông tin sản phẩm</Title>
                <OrderDetailTable orderItemList={orderDetail.orderItemList} />
            </Grid>
            <Grid item xs={12}>
                <Card sx={{
                    border: "1px solid #DDDDDD",
                    boxShadow: "none",
                    borderRadius: "2px",
                    padding: "1rem 0rem"
                }}>
                    <Title marginLeft={2}>Ghi chú mua hàng</Title>
                    <T minHeight="8rem" margin="0.5rem 2rem">
                        {orderDetail.note}
                    </T>
                </Card>
            </Grid>
        </Grid>
    )
}