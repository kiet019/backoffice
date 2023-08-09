"use client"
import Card from "@mui/material/Card";
import React, { ReactNode } from "react";
import { Title } from "../typography/title";
import Collapse from "@mui/material/Collapse";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import FlexBetween from "@/components/mui/flex-box/flex-between";
import Box from "@mui/material/Box";
import { SxProps } from "@mui/system/styleFunctionSx";

type Props = SxProps & {
  title: string
  children: ReactNode,
  defaultOpen?: boolean
}
export const CollapseCard: React.FC<Props> = ({ defaultOpen = true, title, children, ...props }) => {
  const [open, setOpen] = React.useState(defaultOpen);
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <Card sx={{
      borderRadius: "2px", 
      ...props
    }}>
      <FlexBetween onClick={handleClick}>
        <Title>{title}</Title>
        {open ? <ExpandLess /> : <ExpandMore />}
      </FlexBetween>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Box marginTop={1}>
          {children}
        </Box>
      </Collapse>
    </Card >
  )
}