# mrcashback

Live Demo [MRCAHSBACK](https://mrcashback-js.vercel.app/)

### Admin User Credentials
Email :  admin@mrcashback.com
Password : !Mrcashback123

## Probation Project

## Probation Duration 4 Days

This project was/will be completed in 4 Days.

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run your unit tests

```
npm run test:unit
```

### Lints and fixes files

```
npm run lint
```

### Run Cordova Android

```
npm run cordova-serve-android
```

### Build Cordova Android

```
npm run cordova-build-android
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### Signed APK with

```bash
keytool -genkey -v -keystore mrcashback.keystore -alias mrcashback -keyalg RSA -keysize 2048 -validity 10000
 jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore mrcashback.keystore app-release-unsigned.apk mrcashback
 ~/Android/Sdk/build-tools/30.0.2/zipalign -v 30 app-release-unsigned.apk mrcashback.apk
```
