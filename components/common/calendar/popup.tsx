"use client"
import * as React from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateRangeCalendar } from '@mui/x-date-pickers-pro/DateRangeCalendar';

export default function CalendarPopup({
  value, setValue
} : {
  value: any, 
  setValue: any
}) {


  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>

      <DateRangeCalendar
        calendars={1}
        value={value}
        onChange={(newValue) => setValue(newValue)}
      />

    </LocalizationProvider>
  );
}