"use client"
import CardMedia from "@mui/material/CardMedia"
import Dialog from "@mui/material/Dialog"

export const ImagePopup = ({ imageHref, setOpen, open }: { imageHref: string, setOpen: any, open: boolean }) => {
    return (
        <Dialog open={open} onClose={() => {
            setOpen(false)
        }}>
            <CardMedia component="img" image={imageHref} sx={{
                width: "100%",
                height: "100%",
                
            }}/>
        </Dialog>
    )
}