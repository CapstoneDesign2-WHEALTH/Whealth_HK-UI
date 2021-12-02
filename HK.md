
# About HealthKit

## Objective.
Get Health Data from iPhone's Health App. Use those datas for our app.

## Installation
For installation, check for https://github.com/agencyenterprise/react-native-health 
Follow the basic install processes.

## About the API
Enables getting data from iPhone's Health Apps, including :
- Height, Weight, BMI, Heartrate, workout infos ... etc

## 


## Things to notice.

You must check carefull about pods.
Whenever you add external libraries and dependencies, make sure to deal with pods.
I strongly recommend you to do following when you change your dependencies:
- go to ```ios``` folder
- remove ```Podfile.lock```
- remove ```PROJECT_NAME.xcworkspace``` file
- in ```ios``` folder, run ```pod install``` and ```pod update```

If dependency problem still happens, such like :
xxxx (dependency name) can't be found in ../xxx (directory foler)
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

