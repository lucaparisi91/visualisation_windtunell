import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const parseDayJsTime = function( e)
{
    return e.format("YYYY-MM-DD HH:mm:ss")
}

export default function DatePickerValue( props) {
  
  const [fromDate,setFromDate] = React.useState( "2023-07-01 00:00:00")
  const [toDate,setToDate] = React.useState( "2023-07-30 00:00:00")
  
  const timeFormat="YYYY-MM-DD HH:mm:ss"
  console.log( props)


  const onChangeFromDate = function( e )
  {
    const newFromDate= e.format(timeFormat)
    console.log(newFromDate)
    setFromDate(newFromDate)

    props.onDateChange(newFromDate,toDate)

  }

  const onChangeToDate = function( e )
  {
    const newToDate= e.format(timeFormat)

    setToDate(newToDate)

    props.onDateChange(fromDate,newToDate)

  }



  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      
        <DatePicker onChange={ onChangeFromDate }  value = { dayjs(fromDate,timeFormat)}
          />
        <DatePicker value = {dayjs(toDate,timeFormat)} onChange={ onChangeToDate}  />
    </LocalizationProvider>
  );
}
