# Administra - Absense Tracker

Administra allows to create training sessions and track people's
attendance.

## Features

- Login using Google Auth or Email/Passowrd
- Create training classes with meta data (title, start, end, weekday, section)
- Add participants to a training class
- Mark participants as present for a particular date
- Statistics: View attendance of a training class per year
- ...

## Technical Aspects

Current stack: npm, node, nuxt, vuejs, vuex, vuetify
Backend: firebase (auth, firestore, hosting, functions)

## Contribution

More than welcome, I am looking for a productve partnership...
I believe this product has high potential and we could ease a lot of lives in the judo world.
As I am a busy man I invested little time. I can bring a network of customers for this idea.
In case you see the potential and also believe in open source please drop me a line.

## Development Setup

1. Create Firebase account
2. Source environment with data from firebase account

```
export APP_FIREBASE_API_KEY=
export APP_FIREBASE_AUTH_DOMAIN=
export APP_FIREBASE_DATABASE_URL=
export APP_FIREBASE_PROJECT_ID=
export APP_FIREBASE_STORAGE_BUCKET=
export APP_FIREBASE_MESSAGING_SENDER_ID=
export APP_FIREBASE_APP_ID=

# This requies firestore rules to be setup as well. Check example at end of README
export APP_GOOGLE_LOGIN_DOMAIN=<your-google-domain-if-want-to-restrict>
```

```bash
# Install dependencies
$ npm install

# Serve with hot reload at localhost:3000
$ npm run dev

# Build for production and launch server
$ npm run build
$ npm run start

# Generate static project
$ npm run generate
```

For detailed explanation on how it works, check out [Nuxt.js docs](https://nuxtjs.org).

## Testing

```
# Install firebase emulator
npm install -g firebase-tools
apt install openjdk-16-jdk-headless

# Start emulator
firebase emulators:start

# Run tests
npm run tests
or
npm run test -- --silent=false --runInBand --forceExit
```

## Deployment

We use netify to host the webapp.

1. Run 'npm run generate' which generates the webapp into `dist`
2. Netlify then hosts `dist`

## Restricted Login (Google Authentication with specific Domain)

This Webapp restricts login to Google Accounts with a given domain.
To make this happen, Firebase Auth needs a configuration to allow Google Auth.
Further the firestore database rules need to restrict reads and writes from
authenticated users with matching domain.
And lastly set the environment `APP_GOOGLE_LOGIN_DOMAIN` accordingly.

Example Config (allow Google Accounts with domain `jacwohlen.ch`)

```
...
export APP_GOOGLE_LOGIN_DOMAIN=jacwohlen.ch
```

Firestore rules

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null
      && validAccount(request.auth.token.email);
    }
  }
}

function validAccount(userEmail){
	return userEmail.split('@')[1] == 'jacwohlen.ch'; # your domain
}

```

## Tips

- Tip use `nvm install --lts` to install long term support version of `node`.
- Nuxt Fetch vs AsyncData vs Hooks https://medium.com/js-dojo/universal-data-fetching-in-nuxt-js-13ad9933524c
