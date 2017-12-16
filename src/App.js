import React, { Component } from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryStack, VictoryPie, VictoryLegend, VictoryTooltip} from 'victory';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell} from 'recharts';
import './App.css';
import * as Vis from 'react-vis';

const COLORS = ['#9EC928', '#0A9928'];

const offices = [
  { name: "Astley House", members: 120, men: 86, women: 34},
  { name: "KCS", members: 70, men: 47, women: 23}
];

const men = [
  { name: "Astley House", members: 86},
  { name: "Kensington Church Street", members: 47 }
];

const women = [
  { name: "Astley House", members: 34},
  { name: "Kensington Church Street", members: 23 }
];

class App extends Component {
  render() {
    return (
      <div>
        <div className="flex-container">
          <div className='margin'>
            <PieChart width={300} height={250}>
              <Legend/>
              <Tooltip/>
              <Pie data={offices} nameKey="name" dataKey="members" label>
                {offices.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)}
              </Pie>
            </PieChart>
          </div>
          <div className='margin1'>
            <VictoryPie data={offices} x="name" y="members" padding={120}
                        colorScale={COLORS}
                        labels={(d) => `${d.name}:${d.members}`}>

              <VictoryTooltip/>
            </VictoryPie>
          </div>
          <div className='margin2'>
            <Vis.RadialChart showLabels colorType={'literal'} width={270} height={220}
              data={offices.map((d, i) => ({angle: d.members, label: d.name + ": " + d.members, color: COLORS[i]}))}/>
          </div>
        </div>
        <div>
        </div>

        <div className="flex-container">
          <div>
            <BarChart width={400} height={300} data={offices} margin={60}>
              <XAxis dataKey="name"/>
              <YAxis/>
              <Legend/>
              <Tooltip/>
              <Bar dataKey="men" stackId="a" fill={COLORS[0]}/>
              <Bar dataKey="women" stackId="a" fill={COLORS[1]}/>
            </BarChart>
          </div>
          <div className='margin1'>
            <VictoryChart domainPadding={50} theme={VictoryTheme.material}>
              <VictoryAxis tickValues={[1, 2]} tickFormat={["Astley House", "KCS"]}/>
              <VictoryAxis dependentAxis/>
              <VictoryLegend x={230} y={45} orientation="vertical" gutter={20}
                             style={{border: {stroke: "black"}, title: {fontSize: 20}}}
                             data={[{name: "Women", symbol: {fill: COLORS[1]}}, {
                               name: "Men",
                               symbol: {fill: COLORS[0]}
                             }]} />
              <VictoryTooltip/>
              <VictoryStack colorScale={COLORS}>
                <VictoryBar data={men} x="name" y="members"/>
                <VictoryBar data={women} x="name" y="members"/>
              </VictoryStack>
            </VictoryChart>
          </div>
          <div>
            <Vis.XYPlot xType="ordinal" width={400} height={300} stackBy="y">
              <Vis.DiscreteColorLegend orientation="horizontal" width={200} items={["Men", "Women"]} colors={COLORS}/>
              <Vis.VerticalBarSeries data={men.map(d => ({x: d.name, y: d.members}))} marginLeft={50}
                                     fill={COLORS[0]}
                                     stroke={COLORS[0]}/>
              <Vis.VerticalBarSeries data={women.map(d => ({x: d.name, y: d.members}))} marginLeft={50}
                                     fill={COLORS[1]}
                                     stroke={COLORS[1]}/>
              <Vis.XAxis marginLeft={50}/>
              <Vis.YAxis/>
            </Vis.XYPlot>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
