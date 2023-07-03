import { useMemo, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useGetSalesQuery } from '../../state/api';
import { Box, useTheme } from '@mui/material';
function Daily() {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date('2023-07-03'));
    const theme = useTheme()
    const { data, isLoading } = useGetSalesQuery();

    const [formattedData] = useMemo(() => {
        if (!data) return [];

        const { dailyData } = data;
        type totalProps = {
            id: string;
            color: string;
            data: { x: any, y: any }[];
        };
        const totalSalesLine: totalProps = {
            id: 'totalSales',
            color: theme.palette.secondary.main,
            data: [],
        };
        const totalUnitsLine: totalProps = {
            id: 'totalUnits',
            color: theme.palette.secondary[600],
            data: [],
        };

        Object.values(dailyData).forEach(({ date, totalSales, totalUnits }) => {
            const dateFormatted = new Date(date);
            if (dateFormatted >= startDate && dateFormatted <= endDate) {
                const splitDate = date.substring(date.indexOf('-') + 1);

                totalSalesLine.data = [
                    ...totalSalesLine.data,
                    { x: splitDate, y: totalSales },
                ];
                totalUnitsLine.data = [
                    ...totalUnitsLine.data,
                    { x: splitDate, y: totalUnits },
                ];
            }
        });
        const formattedData = [totalSalesLine, totalUnitsLine];
        return [formattedData];

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, startDate, endDate])
    
    return (
        <Box m='1.5rem 2.5rem'>
            <Header title='DAILY SALES' subtitle="Chart of daily sales." />
            <Box height='75vh'>
                <Box display='flex' justifyContent='flex-end'>
                    <DatePicker 
                        selected={startDate}
                        onChange={(date: SetStateAction<Date>) => setStartDate(date)}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                    />
                    <DatePicker 
                        selected={endDate}
                        onChange={(date: SetStateAction<Date>) => setEndDate(date)}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                    />
                </Box>
            </Box>
        </Box>
    )
}
export default Daily