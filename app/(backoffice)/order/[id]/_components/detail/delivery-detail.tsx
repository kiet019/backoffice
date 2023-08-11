import { DeliveryUserInfo } from '../interface'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import { FieldData } from '@/components/common/field-data'
import { T } from '@/components/common/typography/text'

export const DeliveryUserInfoCard = ({
  deliveryUserInfo,
  isHiddenCheckbox = false
}: {
  deliveryUserInfo: DeliveryUserInfo
  isHiddenCheckbox?: boolean
}) => {
  return (
    <>
      <FieldData name='Họ và tên'>
        <T fontWeight={500}>{deliveryUserInfo.name}</T>
      </FieldData>
      <FieldData name='Email'>
        <T fontWeight={500}>{deliveryUserInfo.email}</T>
      </FieldData>
      <FieldData name='SĐT'>
        <T fontWeight={500}>{deliveryUserInfo.phone}</T>
      </FieldData>
      <FieldData name='Địa chỉ'>
        <T fontWeight={500}>{deliveryUserInfo.address}</T>
      </FieldData>
      <FieldData isHidden={isHiddenCheckbox} name='Nguời nước ngoài'>
        {deliveryUserInfo.isForegin ? (
          <CheckBoxIcon
            sx={{
              color: '#707070'
            }}
          />
        ) : (
          <CheckBoxOutlineBlankIcon
            sx={{
              color: '#707070'
            }}
          />
        )}
      </FieldData>
    </>
  )
}
