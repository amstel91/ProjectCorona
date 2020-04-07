# ProjectCorona
A mobile app that gives stats about corona virus

# Get started with React Native
https://reactnative.dev/docs/environment-setup

# API Links
https://rapidapi.com/astsiatsko/api/coronavirus-monitor?endpoint=apiendpoint_1f6e9f84-d051-4d4d-9106-8bbeb3f162c4

# Generate Icons for all platforms
react-native set-icon --path ~/Downloads/rsz_corona_3.png --platform all --background white

# Build and generate APK
## Android (in android folder)
./gradlew bundleRelease --stacktrace

then run below command to generate apks
bundletool build-apks --bundle app/build/outputs/bundle/release/app.aab --output=~/Desktop/app.apks --ks=app/android.keystore  --ks-key-alias=gocorona --ks-pass=pass:gocorona

connect your phone and enable usb debugging
Run the below command to check if your device is connected
adb devices

To install on your device run the below command
bundletool install-apks --apks=~/Desktop/app.apks
