import Typography from "@mui/material/Typography";
import { SxProps } from "@mui/system/styleFunctionSx";
import React, { ReactNode } from "react";


type Props = SxProps & {
    children: ReactNode,
    readonly?: boolean
}
export const T: React.FC<Props> = ({ readonly = true,children, ...props }) => (
    <Typography component="div" aria-readonly={readonly} sx={{
        ...props
    }}>
        {children}
    </Typography >
)