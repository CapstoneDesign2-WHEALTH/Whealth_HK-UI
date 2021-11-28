import React from 'react';
import {Defs, LinearGradient, Stop, Line} from 'react-native-svg';
import {LineChart, Grid} from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import Colors from '../constants/Colors';
import {View} from 'react-native';
class GradientLineExample extends React.PureComponent {
  render() {
    const data = [0, 0, 0, 100, 400, 800, 1300, 1300, 1600, 1800, 2000];

    const HorizontalLine = ({y}) => (
      <>
        <Line
          key={'zero-axis'}
          x1={'0%'}
          x2={'100%'}
          // y1={y(50)}
          // y2={y(50)}
          y1={'0%'}
          y2={'0%'}
          stroke={Colors.black}
          strokeDasharray={[4, 8]}
          strokeWidth={1}
        />

        <Line
          x1={'0%'}
          x2={'100%'}
          y1={y(-200)}
          y2={y(-200)}
          stroke={Colors.gray}
          strokeDasharray={[4, 8]}
          strokeWidth={1}
        />
      </>
    );

    const Gradient = () => (
      <Defs key={'gradient'}>
        <LinearGradient id={'gradient'} x1={'0'} y={'0%'} x2={'100%'} y2={'0%'}>
          <Stop offset={'0%'} stopColor={'rgb(134, 65, 244)'} />
          <Stop offset={'100%'} stopColor={'rgb(66, 194, 244)'} />
        </LinearGradient>
      </Defs>
    );

    return (
      <LineChart
        style={{height: '100%', width: '100%', paddingHorizontal: 0}}
        data={data}
        curve={shape.curveBasisOpen}
        contentInset={{top: 20, bottom: 20}}
        svg={{
          strokeWidth: 3,
          stroke: 'url(#gradient)',
        }}>
        {/* <Grid /> */}
        <HorizontalLine />
        <Gradient />
      </LineChart>
    );
  }
}

export default GradientLineExample;