import Typography from "@mui/material/Typography";
import { SxProps } from "@mui/system/styleFunctionSx";
import React, { ReactNode } from "react";


type Props = SxProps & {
    children: ReactNode
}
export const Title: React.FC<Props> = ({ children, ...props }) => (
    <Typography sx={{
        fontSize: "15px",
        fontStyle: "normal",
        fontWeight: 700,
        lineHeight: "24px",
        letterSpacing: "0.4px",
        textTransform: "uppercase",
        ...props
    }}>
        {children}
    </Typography >
)

// font - weight: 500;
// line - height: 24px; /* 171.429% */
// letter - spacing: 0.4px;
// text - transform: uppercase;