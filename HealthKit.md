
# About HealthKit

## Objective.
Get Health Data from iPhone's Health App. Use those datas for our app.

## Installation
For installation, check for https://github.com/agencyenterprise/react-native-health, the OFFICIAL_DOCUMENT.

Follow the basic install processes.

## About The API
Enables getting data from iPhone's Health Apps, including 
- Height, Weight, BMI, Heartrate, workout infos ... etc

## How To Use
1.First, you need to import libraries 

```import appleHealthKit from 'react-native-health'```

2.Set options for API's Permission to access Health data.

Check for OFFICIAL_DOCUMENT's ```initHealthKit``` page

3.After you grant permission options, you can use various methods in OFFICIAL_DOCUMENT. 

Here are some examples : 

- ```getDateOfBirth``` : Get birth data and age from Health App.

- ```getLatestHeight``` : Get height from Health App.

- ```saveWater``` : Set water info in specific y/m/d in Health App.

With various methods, you can read/write various Health App Data.

Lastly, don't forget to grant permission in your options!


## Issue : Dependency

You must check carefull about pods.
Whenever you add external libraries and dependencies, make sure to deal with pods.
I strongly recommend you to do following when you change your dependencies:
- go to ```ios``` folder
- remove ```Podfile.lock```
- remove ```PROJECT_NAME.xcworkspace``` file
- in ```ios``` folder, run ```pod install``` and ```pod update```

If dependency problem still happens, such like :

```dependency_name``` can't be found in ```../directory foler``` 
then you need to deal with not only Pods, but also node_modules.
So you need to do followings:

- go to root folder.
- delete the directory ```node_modules``` using ```rm -rf node_modules```
- delete the file ```package-lock.json```
- go to ```ios``` folder
- remove ```Podfile.lock```
- remove ```PROJECT_NAME.xcworkspace```
- go root folder
- run ```npm -i```
- check if ```package-lock.json``` and ```node_modules``` regenerated includes libraries you want to import.
- if doesn't, there likely be error while installing with terminal. (ex. ```npm install react-native/DEPENDENCY_NAME```)
- move to ```ios``` folder
- run ```pod install``` , ```pod update```
- check ```PROJECT_NAME.xcworkspace``` generated
- Open the ```PROJECT_NAME.xcworkspace``` and build it.

## Issue : Non-zero Exit Code

Often, Non-zero Exit Code Error happens. 
This Happens because of various reasons, so you can carefully check error log of Xcode.

In our case, Non-zero Exit Code happened of followings:
- Javascript Syntax Error
- Dependency Error
- Async Error

There is no specific solution for first error, And we provided solution for second error above.

For third error, it happens because ```InitHealthkit``` happens asynchronously. We need to deal with this after.

## Build Environment

- With iPhone simulator, ```npm run ios```
- With iPhone device you have, you can open  ```PROJECT_NAME.xcworkspace```, set running device, and run


