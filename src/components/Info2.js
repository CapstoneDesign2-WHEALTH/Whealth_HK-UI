import * as React from 'react';
import {Text, View, SafeAreaView, StyleSheet, Dimensions} from 'react-native';

import Carousel from 'react-native-snap-carousel';
import Styles from '../common/Styles';
import Colors from '../constants/Colors';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      carouselItems: [
        {
          title: 'Bad',
          text: '물을 한 번에 많이 마시면 소화가 잘 되지 않습니다.',
        },
        {
          title: 'Bad',
          text: '찬물을 많이 마시면 집중력을 떨어뜨릴 수 있습니다.',
        },
        {
          title: 'Bad',
          text: '땀을 흘린 뒤에 물을 많이 마시면 좋지 않습니다.',
        },
      ],
    };
  }

  _renderItem({item, index}) {
    return (
      <View style={styles.infoText}>
        <Text style={{...Styles.boldText, fontSize: 17}}>{item.title}</Text>
        <View
          style={{
            ...styles.bar,
            backgroundColor: '#B933F9',
          }}></View>
        <View
          style={{
            ...styles.bar,
            backgroundColor: '#F3D9FF',
            left: 40,
            zIndex: -1,
          }}></View>
        <Text
          style={{
            ...Styles.Text,
            fontSize: 13,
            marginTop: 50,
          }}>
          {item.text}
        </Text>
      </View>
    );
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.carousel}>
          <Carousel
            layout={'tinder'}
            ref={ref => (this.carousel = ref)}
            data={this.state.carouselItems}
            sliderWidth={SCREEN_WIDTH / 1.9}
            itemWidth={SCREEN_WIDTH / 2}
            renderItem={this._renderItem}
            onSnapToItem={index => this.setState({activeIndex: index})}
            autoplay
            autoplayInterval={4000}
            loop
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: 'Lato-Bold',
    position: 'relative',
  },
  carousel: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  infoText: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    width: '85%',
    height: '100%',
    padding: 20,
    // marginLeft: 25,
    // marginRight: 25,
  },
  bar: {
    position: 'absolute',
    backgroundColor: '#B933F9',
    top: 60,
    left: 30,
    width: 10,
    height: 20,
    borderRadius: 4,
    transform: [{rotate: '90deg'}],
  },
});