import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const parseDayJsTime = function( e)
{
    return e.format("YYYY-DD-MM HH:mm:ss")
}


function TimeRange( {dateRange, onTimeRangeChange } ) {

  const handleFromDateChange= ( e ) =>
  {
    const newDateRange= [ e.toDate(), dateRange[1] ]

    onTimeRangeChange( newDateRange )

  }

  const handleToDateChange= ( e ) =>
  {
    const newDateRange= [ dateRange[0], e.toDate() ]

    onTimeRangeChange( newDateRange )

  }



  return (
    <div className={"TimeRange"} >
    <LocalizationProvider dateAdapter={AdapterDayjs}>

        From: <DatePicker 
        value={dayjs(dateRange[0])  } onChange={handleFromDateChange }  />
        To: <DatePicker  value={dayjs(dateRange[1])} onChange={handleToDateChange }   />
        
    </LocalizationProvider>
    </div>
  );

}


export { TimeRange }