import FlexBox from "@/components/mui/flex-box/flex-box"
import { ReactNode } from "react"
import { T } from "../typography/text"

export const FieldData = ({ name, children, isHidden = false }: {
    name: string,
    isHidden?: boolean
    children: ReactNode
}) => {
    return (
        <FlexBox alignItems="center" marginTop="0.25rem" sx={{
            visibility: isHidden ? "hidden" : "visible"
        }}>
            <T color="#707070" fontWeight={700} letterSpacing="0.15px" marginRight={1}>{name}:</T>
            {children}
        </FlexBox >
    )
}