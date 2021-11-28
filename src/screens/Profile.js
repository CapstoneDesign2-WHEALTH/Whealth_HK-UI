import AppleHealthKit, {
  HealthValue,
  HealthKitPermissions,
} from 'react-native-health';
import React, {useEffect, useState, Animated} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  ImageBackground,
  Image,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Styles from '../common/Styles';
import Colors from '../constants/Colors';
import bg from '../../assets/images/bg.png';
import waterMan from '../../assets/images/waterman.png';
import Ionicons from 'react-native-vector-icons/Ionicons';
import database from '@react-native-firebase/database';
import appleHealthKit from 'react-native-health';

const {width: SCREEN_WIDTH, height: SCREEN_height} = Dimensions.get('window');
/* Permission options */
let options = {
  permissions: {
    read: [
      AppleHealthKit.Constants.Permissions.HeartRate,
      AppleHealthKit.Constants.Permissions.BloodPressureDiastolic,
      appleHealthKit.Constants.Permissions.BloodPressureSystolic,
      AppleHealthKit.Constants.Permissions.Steps,
      AppleHealthKit.Constants.Permissions.StepCount,
      AppleHealthKit.Constants.Permissions.ActiveEnergyBurned,
      AppleHealthKit.Constants.Permissions.Height,
      AppleHealthKit.Constants.Permissions.Weight,
      AppleHealthKit.Constants.Permissions.SleepAnalysis,
      AppleHealthKit.Constants.Permissions.BiologicalSex,
      AppleHealthKit.Constants.Permissions.DateOfBirth,
      AppleHealthKit.Constants.Permissions.Water,
      AppleHealthKit.Constants.Permissions.HeartRate,
    ],
    write: [
      AppleHealthKit.Constants.Permissions.Steps,
      AppleHealthKit.Constants.Permissions.StepCount,
      AppleHealthKit.Constants.Permissions.Weight,
      AppleHealthKit.Constants.Permissions.Water,
    ],
  },
};

// Initializing HealthKit
AppleHealthKit.initHealthKit(
  (options: HealthInputOptions),
  (err: string, results: boolean) => {
    if (err) {
      console.log('error initializing Healthkit: ', err);
      return;
    }
    //console.log('we got permissions!');
    // Healthkit is initialized...
    // now safe to read and write Healthkit data...
  },
);

//Setting Weight Option.
let WeightOption = {
  unit: 'kilogram',
};

//Setting steop option
let StepOption = {
  date: new Date().toISOString(), // optional; default now
  includeManuallyAdded: false, // optional: default true
};

let HeartRateOption = {
  unit: 'bpm', // optional; default 'bpm'
  startDate: new Date(2021, 10, 26).toISOString(), // required
  endDate: new Date().toISOString(), // optional; default now
  ascending: false, // optional; default false
  limit: 10, // optional; default no limit
}


let WalkRunOption = {
  unit: 'meter', // optional; default 'meter'
  date: (new Date(2021,10,27)).toISOString(), // optional; default now
  includeManuallyAdded: false // optional: default true
};


// Variables for HK datas
let Age, BirthDate;
let Weight, Height;
let Steps, Sex;
let HeartRate;
let WalkRun;


//Method to get DateOfBirth
AppleHealthKit.getDateOfBirth(
  null,
  (err: Object, results: HealthDateOfBirth) => {
    if (err) {
      return;
    }

    //console.log(results);
    //console.log('type of?')
    //console.log(typeof results)
    //console.log(typeof results.age)
    //console.log(typeof results.value)

    Age = results.age;
    BirthDate = results.value.substring(0, 10);
    //return results
  },
);

//Method to get  Height
AppleHealthKit.getLatestHeight(null, (err: string, results: HealthValue) => {
  if (err) {
    console.log('error getting latest height: ', err);
    return;
  }
  //console.log(results);
  var InchHeight = parseInt(results.value);
  var CentHeight = InchHeight * 2.54;
  Height = CentHeight;
});

//Method to get Weight
AppleHealthKit.getLatestWeight(
  WeightOption,
  (err: string, results: HealthValue) => {
    if (err) {
      //console.log('error getting latest weight: ', err);
      return;
    }
    Weight = results.value;
  },
);

//Method to get sex
AppleHealthKit.getBiologicalSex(null, (err: Object, results: Object) => {
  if (err) {
    return;
  }
  //console.log(results)
  Sex = results.value;
});

// Method to get StepCount of today
AppleHealthKit.getStepCount(
  (StepOption: HealthInputOptions),
  (err: Object, results: HealthValue) => {
    if (err) {
      return;
    }
    Steps = results.value;
    //console.log(results)
  },
);


AppleHealthKit.getHeartRateSamples(
  HeartRateOption,
  (err: Object, results: Array<HealthValue>) => {
    if (err) {
      return
    }
    //console.log("Getting HeartRate!")
    //console.log(results)
    HeartRate = results[0].value;
  },
)

/*
AppleHealthKit.getDistanceWalkingRunning(
  (WalkRunOption: HealthInputOptions),
  (err: Object, results: HealthValue) => {
    if (err) {
      return
    }
    //console.log(results)
    WalkRun=results.value;
  },
)
*/


export default function Profile({route, navigation}) {

  const [itemsArray, setItemsArray] = React.useState([]); // 

  let category = "Sogang";
  let categoryName = category;
  let itemsRef;

  if(category){
    categoryName = category.concat("/"); // 입력받은 category 뒤에 '/'를 붙여서 categoryName으로 지정 (주소표시)
    itemsRef = database().ref(categoryName); // 지정한 categoryName에 해당하는 파이어베이스 데이터베이스 항목들을 itemsRef에 불러옴
  }
  else{
    categoryName = "";
    itemsRef = database().ref().root;
  }

  itemsRef.on('value', snapshot => { // on함수(데이터베이스 값이 바뀔 때마다 지속적으로 업데이트해서 읽어오는 함수)
    let data = snapshot.val(); // snapshot함수(파이어베이스 데이터베이스 현재 상태를 읽어옴)
    if(!data){
      return alert("Wrong category name!");
    }
    const items = Object.entries(data); // data에 해당하는 entries (name, value 전부) 를 items에 넣음
    setItemsArray(items); // items 객체를 이용해 itemsArray 배열 값을 set함
  });



  return (
    <ImageBackground source={bg} resizeMode="cover" style={styles.bg}>
      <View style={styles.container}>
        <View style={styles.page0}>
          <Text style={Styles.boldText}>Profile</Text>
        </View>
        <View style={styles.page2}>
          {/* <Text>성별, 생년월일, 키, 나이, 이름</Text> */}
          <View style={styles.profileCard}>
            <View style={styles.profileCard2}>
              <Image
                source={waterMan}
                resizeMode="contain"
                style={styles.waterMan}
              />
            </View>
            <View style={styles.profileCard3}>
              <View style={styles.cardData}>
                <Text style={styles.profileCardText}>이름</Text>
                <Text style={styles.profileCardText}>이름</Text>
              </View>
              <View style={styles.cardData}>
                <Text style={styles.profileCardText}>성별</Text>
                <Text style={styles.profileCardText}>{Sex}</Text>
              </View>
              <View style={styles.cardData}>
                <Text style={styles.profileCardText}>생년월일</Text>
                <Text style={styles.profileCardText}>{BirthDate}</Text>
              </View>
              <View style={styles.cardData}>
                <Text style={styles.profileCardText}>나이</Text>
                <Text style={styles.profileCardText}>{Age}</Text>
              </View>
              <View style={styles.cardData}>
                <Text style={styles.profileCardText}>심박수</Text>
                <Text style={styles.profileCardText}>{HeartRate}bpm</Text>
              </View>

              
            </View>
          </View>
        </View>
        <View style={styles.page3}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scroll}>
            

            {itemsArray.length > 0 ? ( // 만약 itemsArray 안에 값이 있으면, 
          <View style={styles.normalList}>
          {itemsArray.map((item, index) => { //map 함수로 itemsArray 배열을 다 돌아다니면서
            return ( // item[0]: item[1] 양식으로 파이어베이스 데이터베이스의 itemName과 item 값을 출력함 
              <View key={index}>
                <Text style={styles.normalTexts}>
                  {item[0]}: {item[1]}
                </Text>
              </View>
            );
          })}
        </View> // 만약 itemsArray 안에 값이 없으면 No items를 출력함
        ) : (
          <Text>No items</Text>
        )}

            {/* 데이터 */}
            <View style={styles.alarmBox}>
              <View style={styles.alarmBox1}>
                <View style={{flexDirection: 'row'}}>
                  <Ionicons name="flame" size={20} color="red" />
                  <Text style={styles.alarmText}> 걷기 달리기 거리</Text>
                </View>
              </View>
              <View style={styles.alarmBox2}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                  }}>
                  <Text style={styles.alarmText2}>4.6 </Text>
                  <Text
                    style={{...styles.alarmText2, fontSize: 14, marginLeft: 0}}>
                    km
                  </Text>
                </View>
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
  },
  page0: {
    flex: 0.6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
  },
  page2: {
    flex: 2,
  },
  page3: {
    flex: 3,
  },
  page4: {
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
    height: 100,
  },
  alarmBox1: {
    position: 'absolute',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%',
    height: '40%',
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
    height: '60%',
    bottom: 0,
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
    fontSize: 15,
    color: 'red',
  },
  alarmText2: {
    ...Styles.Text,
    marginLeft: 15,
    fontSize: 30,
    color: Colors.black,
  },
  profileCard: {
    position: 'relative',
    marginHorizontal: '3%',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: '95%',
    // backgroundColor: Colors.bg,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: Colors.black,
    // backgroundColor: Colors.black,
  },
  profileCard2: {
    width: '50%',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileCard3: {
    // backgroundColor: Colors.pink,
    width: '50%',
    height: '100%',
    borderRadius: 20,
    justifyContent: 'center',
  },
  cardData: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
  profileCardText: {
    ...Styles.boldText,
    paddingVertical: 10,
    // color: Colors.white,
    fontSize: 16,
  },
  waterMan: {
    position: 'relative',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
});