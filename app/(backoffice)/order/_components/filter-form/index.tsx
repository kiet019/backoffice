"use client"

import Grid from "@mui/material/Grid"
import { useEffect, useState } from "react"
import { SelectOption } from "../search-box/option"
import { SearchInput } from "../search-box/input"
import { SubTitle } from "../../../../../components/common/typography/sub-title"
import FlexBetween from "@/components/mui/flex-box/flex-between"
import Box from "@mui/material/Box"
import { styled } from "@mui/material/styles"
import Button from "@mui/material/Button"
import MultipleSelectOption from "../../../../../components/common/multi-select-option"
import ViewDate from "../../../../../components/common/calendar/view"
import { DateRange, LocalizationProvider } from "@mui/x-date-pickers-pro"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { FilterProps } from "@/lib/order/interface"
import { usePathname, useRouter } from "next/navigation"
import { handleRouteOrderPage } from "@/lib/order/config"
import { SearchParams, convertArrayToString } from "@/lib/config"
import { format } from "date-fns"

const StyledButton = styled(Button)({
    textTransform: "none",
    margin: "10px 5px",
    width: "80px",
    height: "40px"
})


interface Props {
    filterProps: FilterProps,
    searchParams: SearchParams
}

export const FilterForm = ({ filterProps, searchParams }: Props) => {
    const [searchOption, setSearchOption] = useState<number>(filterProps.searchOption.id)
    const [searchInput, setSearchInput] = useState<string>(filterProps.searchInput)
    const [companyOption, setCompanyOption] = useState<number[]>(filterProps.filterOptionsList[0].filterOption)
    const [statusOption, setStatusOption] = useState<number[]>(filterProps.filterOptionsList[1].filterOption)
    const [countryOption, setCountryOption] = useState<number[]>(filterProps.filterOptionsList[2].filterOption)
    const [dateOption, setDateOption] = useState<number[]>(filterProps.filterOptionsList[3].filterOption)
    const [dateValue, setDateValue] = useState<DateRange<Date> | undefined>(
        [filterProps.dateStart, filterProps.dateEnd]
    );
    const [error, setError] = useState<boolean>(false)

    useEffect(() => {
        setSearchOption(filterProps.searchOption.id);
        setSearchInput(filterProps.searchInput);
        setCompanyOption(filterProps.filterOptionsList[0].filterOption);
        setStatusOption(filterProps.filterOptionsList[1].filterOption);
        setCountryOption(filterProps.filterOptionsList[2].filterOption);
        setDateOption(filterProps.filterOptionsList[3].filterOption);
        setDateValue([filterProps.dateStart, filterProps.dateEnd])
    }, [filterProps]);



    const router = useRouter()
    const handleChangeDateValue = (data: DateRange<Date>) => {
        setDateValue(data)
    }

    const handleChangeInput = (data: any) => {
        setSearchInput(data.target.value)
    }

    const handleChangeSearchOption = (data: any) => {
        setSearchOption(data.target.value)
    }

    const handleChangeCompanyOption = (data: number[]) => {
        setCompanyOption(data)
    }

    const handleChangeStatusOption = (data: number[]) => {
        setStatusOption(data)
    }

    const handleChangeCountryOption = (data: number[]) => {
        setCountryOption(data)
    }

    const handleChangeDateOption = (data: number[]) => {
        setDateOption(data)
    }

    const pathname = usePathname()
    const handleFilterClick = () => {
        if ((dateOption.length === 0 && dateValue?.[0] !== null && dateValue?.[1] !== null) 
            || (dateValue?.[0] === null && dateValue?.[1] !== null || dateValue?.[0] !== null && dateValue?.[1] === null || error)) {

        } else {
            const current = searchParams
            current.dateStart = undefined
            current.dateEnd = undefined
            current.option = undefined
            current.input = undefined
            router.push(handleRouteOrderPage({
                current,
                currentPath: pathname,
                input: {
                    input: searchInput.trim(),
                    option: searchOption.toString(),
                    status: convertArrayToString(statusOption),
                    partner: convertArrayToString(companyOption),
                    dateStart: dateValue?.[0] !== null ? format(dateValue?.[0] as Date, "yyyy-MM-dd") : undefined,
                    dateEnd: dateValue?.[1] !== null ? format(dateValue?.[1] as Date, "yyyy-MM-dd") : undefined,
                    dateOption: convertArrayToString(dateOption)
                }
            }).href)

        }
    }
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <SubTitle title="Tìm kiếm" />
            <Grid container spacing={0}>
                <Grid item xs={2.5}>
                    <SelectOption handleChangeOption={handleChangeSearchOption} option={searchOption} options={filterProps.searchOptions} />
                </Grid>
                <Grid item xs={9.5}>
                    <SearchInput handleChangeInput={handleChangeInput} searchInput={searchInput} searchOption={searchOption} options={filterProps.searchOptions} />
                </Grid>
            </Grid>
            <Grid container spacing={0}>
                <Grid item lg={5.5} xs={12}>
                    <SubTitle title="Chọn loại ngày theo thời gian" />
                    <Grid container spacing={0}>
                        <Grid item lg={5.5} xs={2.5}>
                            <MultipleSelectOption
                                handleChangeOption={handleChangeDateOption}
                                option={dateOption}
                                options={filterProps.filterOptionsList[3].filterOptions}
                                error={(dateOption.length === 0 && dateValue?.[0] !== null && dateValue?.[1] !== null)}
                            />
                        </Grid>
                        <Grid item lg={6} xs={9.5}>
                            <ViewDate dateValue={dateValue} handleChangeDateValue={handleChangeDateValue} error={error} setError={setError} />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item lg={6.5} xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <SubTitle title="Đối tác" />
                            <MultipleSelectOption handleChangeOption={handleChangeCompanyOption} option={companyOption} options={filterProps.filterOptionsList[0].filterOptions} />
                        </Grid>
                        <Grid item xs={4}>
                            <SubTitle title="Trạng thái" />
                            <MultipleSelectOption handleChangeOption={handleChangeStatusOption} option={statusOption} options={filterProps.filterOptionsList[1].filterOptions} />
                        </Grid>
                        <Grid item xs={4}>
                            <SubTitle title="Nước" />
                            <MultipleSelectOption handleChangeOption={handleChangeCountryOption} option={countryOption} options={filterProps.filterOptionsList[2].filterOptions} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <FlexBetween>
                <Box></Box>
                <Box>
                    <StyledButton variant="outlined" color="primary" sx={{
                        backgroundColor: "white !important"
                    }} onClick={() => {
                        router.refresh()
                        router.push("/order")
                    }}>Đặt lại</StyledButton>
                    <StyledButton variant="contained" color="primary" onClick={handleFilterClick}>Lọc</StyledButton>
                </Box>
            </FlexBetween>
        </LocalizationProvider>
    )
}