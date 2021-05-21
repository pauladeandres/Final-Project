import { ResponsiveLine } from '@nivo/line'


const LineChart = ({ data }) => {
    return <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }
        }
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', min: '0', max: 'auto', stacked: false, reverse: false }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: -22,
            legend: 'products',
            legendOffset: 36,
            legendPosition: 'middle'
        }}
        axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '# sold',
            legendOffset: -40,
            legendPosition: 'middle'
        }}
        colors={{ scheme: 'brown_blueGreen' }}
        enableArea={true}
        areaOpacity={0.3}
        enableGridX={false}
        enableGridY={false}
        pointSize={5}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={- 12}
        useMesh={true}
        legends={
            [
                {
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 100,
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
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ]}
    />
}


export default LineChart