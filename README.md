![screenshot_2017-12-01-18-04-22](https://user-images.githubusercontent.com/26525967/34509845-a68f678a-f01c-11e7-8767-35ca9295322d.png)

# About

- This project was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app) and is developed with [Expo](https://expo.io) **(technically React Native apps developed with Expo can run on both Android and iOS devices with a single codebase. However, the app has only been tested with Android devices and is not likely to work with iOS devices due to my implementation)**
- Users can register and sign in using email
- Authenticated users can create and view articles
- Articles are created using a rich-text editor and can contain text, images, and links
- Authenticated users can also personalize their profile, bookmark articles and delete their created articles **(bookmarking and deleting articles not fully implemented)**
- Back-end processes such as authentication, storing and accessing data are performed through Firebase

# To do

- Needs a lot of refactoring and cleaning up of code
- Bookmarking and deleting articles need to be fully implemented
- Adding article search and filter functionalities
- Home page needs to only show articles relevant to the user's selected interest(s)
- Entire project is too tied up to Expo and is not very optimized. UI behaviour is inconsistent across different Android devices. Needs to be ejected from Expo. 

# Running the app

1. Clone or download the zip
2. cd into project directory and run "yarn install"
3. run "yarn start", once done a QR code should be visible on terminal
4. Download the Expo mobile app onto Android device. (if app is already on device, skip to step 6)
5. Create an Expo account
6. Scan the QR code from step 3, using the Expo app
7. Wait for app to load on device


