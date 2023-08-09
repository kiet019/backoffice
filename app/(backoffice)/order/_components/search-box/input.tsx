"use client"
import { OptionProps, getOptionsName } from "@/lib/config"
import FormControl from "@mui/material/FormControl"
import TextField from "@mui/material/TextField"


export const SearchInput = ({ handleChangeInput, searchInput, searchOption, options }: {
    handleChangeInput: any,
    searchInput?: string,
    searchOption: number,
    options: OptionProps[]
}) => {
    return (
        <FormControl fullWidth>
            <TextField
                focused={false}
                sx={{
                    "& .MuiInputBase-root": {
                        backgroundColor: "white",
                        borderRadius: "0px",
                        height: "40px"
                    },
                }}
                placeholder={searchInput !== "" ? searchInput : `Nhập ${getOptionsName(searchOption, options).toLocaleLowerCase()}`}
                onChange={handleChangeInput}
                value={searchInput}
            />
        </FormControl>
    )
}