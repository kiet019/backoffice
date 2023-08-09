import Chip from "@mui/material/Chip";
import { SxProps } from "@mui/system/styleFunctionSx";
import React from "react";


type Props = SxProps & {
    color?: string,
    bgcolor?: string,
    label: string,
    size?: "small" | "medium"
}
export const StyledChip: React.FC<Props> = ({size="medium", label, color = "black", bgcolor = "rgba(0, 0, 0, 0.08)", ...props }) => (
    <Chip label={label} key={label} size={size} sx={{
        color,
        fontWeight: 600,
        backgroundColor: bgcolor,
        margin: "0px 1px",
        borderRadius: "6px",
        ...props
    }} />
)