# Notes

*Re-implemented in React Native as a learning exercise here:  https://github.com/akersh-s/Tofu-React

# Features

### Signup

When users sign up using their email address, email with a temporary password is sent automatically to them. They'll need to change the password prior to using the app.

### Login

To use the app, users need to log in using their email and password.

### Change Password

Users can always change their password, whether it's a temporary password they got upon sign up, or not.

### Reset Password

If one forgets their password, they can enter their email address to get a temporary password via email.

### Dashboard

Placeholder for the app itself. The app tracks the user's geolocation, uses the data to reach out to the OpenWeather API (https://openweathermap.org/api) to retrieve local weather as well as Panoramio API (http://www.panoramio.com/api/widget/api.html) to display a local image as the wallpaper.


# Setup

### Ensure that Ionic 1.3 is Installed: http://ionicframework.com/

### To run the app in a browser:

    1. git clone repo
    2. cd repo
    3. npm install
    4. ionic serve

### To run the app on an Android device:

    5. ionic platform add android
    6. ionic build android
    7. ionic run android

### To run the app on an iOS device:

    5. ionic platform add ios
    6. ionic build ios
    7. ionic run ios
