import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import AppleHealthKit, { HealthValue, HealthKitPermissions } from 'react-native-health';

let WATERDATAS =  [
  {
    // In Liters
    value: 3,
    date: (new Date(2019,2,3)).toISOString()
    // To input Data in Y.M.D,
    // we need to new Date(Y,M+1,D)
    // EX. new Date(2019,2,3) -> Inputs Data in HK : (2019,1,3)
  },
  {
    value: 5,
    date: (new Date(2019,3,4)).toISOString()
  },
  {
    value: 7,
    date: (new Date(2019,4,5)).toISOString()
  },
  {
    value: 9,
    date: (new Date(2019,5,6)).toISOString()
  },
  {
    value: 11,
    date: (new Date(2019,6,7)).toISOString()
  },
]


/* Permission options */
let options ={
  permissions: {
    read: [
      AppleHealthKit.Constants.Permissions.HeartRate,
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
}

// Initializing HealthKit
AppleHealthKit.initHealthKit(
  (options: HealthInputOptions),
  (err: string, results: boolean) => {
    if (err) {
      console.log('error initializing Healthkit: ', err)
      return
    }
      console.log('we got permissions!')
    // Healthkit is initialized...
    // now safe to read and write Healthkit data...
  },
)

//Setting Weight Option.
let WeightOption = {
  unit: 'kilogram',
}

//Setting Height option, but seems not work. It works like Default(Inch)
let HeightOption = {
  unit: 'centimeter'
}

//Setting steop option
let StepOption = {
  date: new Date().toISOString(), // optional; default now
  includeManuallyAdded: false, // optional: default true
}

// Variables for HK datas
let Age,BirthDate
let Weight,Height
let Steps,Sex

//Method to get DateOfBirth
AppleHealthKit.getDateOfBirth(
  null,
  (err: Object, results: HealthDateOfBirth) => {
    if (err) {
      return
    }
    
    console.log(results)
    //console.log('type of?')
    //console.log(typeof results)
    //console.log(typeof results.age)
    //console.log(typeof results.value)

    Age=results.age
    BirthDate=results.value
    //return results
  },
)

//Method to get  Height
AppleHealthKit.getLatestHeight(HeightOption, (err: string, results: HealthValue) => {
  if (err) {
    console.log('error getting latest height: ', err)
    return
  }
  console.log(results)
  Height=results.value
})

//Method to get Weight
AppleHealthKit.getLatestWeight(WeightOption, (err: string, results: HealthValue) => {
  if (err) {
    console.log('error getting latest weight: ', err)
    return
  }
  Weight=results.value
})

//Method to get sex
AppleHealthKit.getBiologicalSex(null, (err: Object, results: Object) => {
  if (err) {
    return
  }
  //console.log(results)
  Sex=results.value
})

// Method to get StepCount of today
AppleHealthKit.getStepCount(
  (StepOption: HealthInputOptions),
  (err: Object, results: HealthValue) => {
    if (err) {
      return
    }
    Steps=results.value
    //console.log(results)
  },
)


/*
  Iterate WaterDatas array, and save them using method
*/
for(let i=0; i<WATERDATAS.length;i++){
  AppleHealthKit.saveWater((WATERDATAS[i]: Object), (err: Object, results: boolean) => {
    if (err) {
      console.log('Error saving water to Healthkit: ', err)
      return
    }
    console.log('water successfully saved')
  })
}


// Main App
const App = () => {

  // NEED TO DEAL WITH : 
  // method call sequence -> Later


  // Show HealthKit data on screen
  return (  
    <View style={styles.container}>
      <Text style={styles.title}>HealthKit Datas</Text>
      <Text style={styles.normalTexts}>Sex: {Sex}</Text>
      <Text style={styles.normalTexts}>Age: {Age}</Text>
      <Text style={styles.normalTexts}>BirthDate: {BirthDate}</Text>
      <Text style={styles.normalTexts}>Height: {Height}</Text>
      <Text style={styles.normalTexts}>Weight: {Weight}</Text> 
      <Text style={styles.normalTexts}>Steps: {Steps}</Text> 
    </View>
  );

};

//Some basic styles
const styles = StyleSheet.create({
  container: {
    flex:1 ,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 30,
  },
  normalTexts:{
    fontSize: 15,
  }
});

export default App;
