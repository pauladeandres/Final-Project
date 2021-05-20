import { ResponsiveTreeMap } from '@nivo/treemap'


const TreeChart = ({ data }) => {
    return (
        <ResponsiveTreeMap
            data={data}
            identity="name"
            value="price"
            valueFormat=">-$.02s"
            margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
            labelSkipSize={12}
            labelTextColor={{ from: 'color', modifiers: [['darker', 1.2]] }}
            parentLabelTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
            borderColor={{ from: 'color', modifiers: [['darker', 0.1]] }}
            colors={{ scheme: 'yellow_green' }}
        />
    )
}

export default TreeChart