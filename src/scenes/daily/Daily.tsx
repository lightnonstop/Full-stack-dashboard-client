import { SetStateAction, useMemo, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useGetSalesQuery } from '../../state/api';
import { Box, useTheme } from '@mui/material';
import Header from '../../components/Header';
import { ResponsiveLine } from '@nivo/line';
function Daily() {
    const [startDate, setStartDate] = useState<Date>(new Date('2021-02-01'));
    const [endDate, setEndDate] = useState<Date>(new Date('2021-03-01'));
    const theme = useTheme()
    const { data } = useGetSalesQuery();

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

    // if (data.dailyData) console.log(formattedData);    

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
                {data ? (
                    <ResponsiveLine
                        data={formattedData}
                        theme={{
                            axis: {
                                domain: {
                                    line: {
                                        stroke: theme.palette.secondary[200]
                                    }
                                },
                                legend: {
                                    text: {
                                        fill: theme.palette.secondary[200]
                                    }
                                },
                                ticks: {
                                    line: {
                                        stroke: theme.palette.secondary[200],
                                        strokeWidth: 1,
                                    },
                                    text: {
                                        fill: theme.palette.secondary[200]
                                    },
                                },
                            },
                            legends: {
                                text: {
                                    fill: theme.palette.secondary[200],
                                },
                            },
                            tooltip: {
                                container: {
                                    color: theme.palette.primary.main,
                                }
                            }
                        }}
                        colors={{ datum: 'color' }}
                        margin={{ top: 50, right: 50, bottom: 70, left: 60 }}
                        xScale={{ type: 'point' }}
                        yScale={{
                            type: 'linear',
                            min: 'auto',
                            max: 'auto',
                            stacked: false,
                            reverse: false,
                        }}
                        curve="catmullRom"
                        yFormat=' >-.2f'
                        axisTop={null}
                        axisRight={null}
                        axisBottom={{
                            orient: 'bottom',
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 90,
                            legend: 'Month',
                            legendOffset: 60,
                            legendPosition: 'middle',
                        }}
                        axisLeft={{
                            orient: 'left',
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: 'Total',
                            legendOffset: -50,
                            legendPosition: 'middle',
                        }}
                        enableGridX={false}
                        enableGridY={false}
                        pointSize={10}
                        pointColor={{ theme: 'background' }}
                        pointBorderWidth={2}
                        pointBorderColor={{ from: 'serieColor' }}
                        pointLabelYOffset={-12}
                        useMesh={true}
                        legends={[
                            {
                                anchor: 'top-right',
                                direction: 'column',
                                justify: false,
                                translateX: 50,
                                translateY: 0,
                                itemsSpacing: 0,
                                itemDirection: 'left-to-right',
                                itemWidth: 80,
                                itemHeight: 20,
                                itemOpacity: 0.75,
                                symbolSize: 12,
                                symbolShape: 'circle',
                                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                                effects: [
                                    {
                                        on: 'hover',
                                        style: {
                                            itemBackground: 'rgba(0, 0, 0, .03)',
                                            itemOpacity: 1,
                                        },
                                    },
                                ],
                            },
                        ]}
                    />
                ) : (<>Loading...</>)}
            </Box>
        </Box>
    )
}
export default Daily