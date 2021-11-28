import React, {useEffect, useState, Animated} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  Modal,
  Alert,
  Pressable,
  ImageBackground,
  // ActivityIndicator,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Styles from '../common/Styles';
import Colors from '../constants/Colors';
import bg from '../../assets/images/bg.png';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native-gesture-handler';

const {width: SCREEN_WIDTH, height: SCREEN_height} = Dimensions.get('window');
export default function Alarm({route, navigation}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteAlarm, setDeleteAlarm] = useState(false);
  return (
    <ImageBackground source={bg} resizeMode="cover" style={styles.bg}>
      <View style={styles.container}>
        {/* <StatusBar style="auto" /> */}
        <View style={styles.page0}>
          <Text style={Styles.boldText}>Alarm</Text>
        </View>
        <View style={styles.page1}>
          <Text style={{...Styles.boldText, fontSize: 12}}>Upcoming Alarm</Text>
          <Text style={{...Styles.boldText, fontSize: 25, marginTop: 10}}>
            19:45, Sat
          </Text>
        </View>
        <View style={styles.page2}>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{...Styles.boldText, fontSize: 30, marginTop: 10}}>
              Take a Pill
            </Text>
          </View>
        </View>
        <View style={styles.page3}>
          {/* 추가 버튼 */}
          <View style={styles.add}>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(true);
              }}>
              <Ionicons name="add" size={35} color={Colors.white}></Ionicons>
            </TouchableOpacity>

            {/* 알람 추가 모달 창 */}
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
              }}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.textStyle}>00:00</Text>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => {
                      setModalVisible(!modalVisible);
                      Alert.alert('Alarm 생성');
                    }}>
                    <Text style={styles.textStyle}>Make Alarm</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
          </View>
          {/* 알람 삭제 모달 창 */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={deleteAlarm}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setDeleteAlarm(!deleteAlarm);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.textStyle}>알람을 삭제하시겠어요?</Text>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {
                    setDeleteAlarm(!deleteAlarm);
                    Alert.alert('알람 삭제 완료');
                  }}>
                  <Text style={styles.textStyle}>알람 삭제</Text>
                </Pressable>
              </View>
            </View>
          </Modal>

          <ScrollView
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scroll}>
            {/* 개별 알람 */}
            <View style={styles.alarmBox}>
              <View style={styles.alarmBox1}>
                <Text style={styles.alarmText}>19:45pm</Text>
                <Text style={{...styles.alarmText, fontSize: 15}}>
                  Take a Pill
                </Text>
              </View>
              <View style={styles.alarmBox2}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Ionicons
                    name="alarm-outline"
                    size={20}
                    color={Colors.black}
                  />
                  <Text style={styles.alarmText2}>Sat</Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setDeleteAlarm(!deleteAlarm);
                  }}>
                  <Ionicons
                    name="trash-outline"
                    size={20}
                    color={Colors.black}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
        <View style={styles.page4}></View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: Colors.bg,
    fontFamily: 'Lato-Bold',
    marginTop: 15,
  },
  bg: {
    position: 'relative',
    bottom: 0,
    right: 0,
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    // zIndex: 100,
  },
  page0: {
    flex: 0.4,
    flexDirection: 'row',
    // backgroundColor: Colors.bg,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
  },
  page1: {
    flex: 0.3,
    // backgroundColor: Colors.bg,
    alignItems: 'center',
  },
  page2: {
    position: 'relative',
    flex: 0.8,
    // backgroundColor: Colors.bg,
  },
  drinkWave: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: '100%',
    height: '100%',
  },
  page3: {
    flex: 2,
    position: 'relative',
  },
  page4: {
    // backgroundColor: Colors.bg,
    height: 80,
  },
  scroll: {
    flexGrow: 1,
    width: '100%',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  alarmBox: {
    position: 'relative',
    marginVertical: 5,
    borderRadius: 20,
    width: SCREEN_WIDTH - 50,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#4c5efd',
    height: 100,
  },
  alarmBox1: {
    position: 'absolute',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%',
    height: '60%',
    top: 0,
    backgroundColor: Colors.white,
    borderBottomColor: Colors.bg,
    borderBottomWidth: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  alarmBox2: {
    position: 'absolute',
    width: '100%',
    height: '40%',
    bottom: 0,
    backgroundColor: '#E3DDF8',
    backgroundColor: Colors.white,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  alarmText: {
    ...Styles.boldText,
    fontSize: 30,
    // color: Colors.white,
  },
  alarmText2: {
    ...Styles.Text,
    fontSize: 12,
    color: Colors.black,
  },
  add: {
    position: 'absolute',
    bottom: 10,
    right: 20,
    zIndex: 100,
    backgroundColor: Colors.darkBlue,
    borderRadius: 300,
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    width: '80%',
    height: '30%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyle: {
    ...Styles.boldText,
  },
});