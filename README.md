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

We use firebase hosting api and function api to deploy the website.

1. Install `npm install -g firebase-tools`
2. Install node_modules for functions `cd functions` and `npm install`
3. Setup environment variables for the function

Add the environment variable (without `export` to `functions/.env`

```
APP_FIREBASE_API_KEY=
APP_FIREBASE_AUTH_DOMAIN=
APP_FIREBASE_DATABASE_URL=
APP_FIREBASE_PROJECT_ID=
APP_FIREBASE_STORAGE_BUCKET=
APP_FIREBASE_MESSAGING_SENDER_ID=
APP_FIREBASE_APP_ID=
```

4. Run `firebase deploy --only functions,hosting`

**Attention:** Make sure new npm dependencies are added to `package.json` and also to `functions/package.json`

Reference: https://medium.com/@sirofjelly/deploying-a-nuxt-ssr-server-side-rendering-app-to-google-firebase-5d90117167db

## Tips

- Tip use `nvm install --lts` to install long term support version of `node`.
- Nuxt Fetch vs AsyncData vs Hooks https://medium.com/js-dojo/universal-data-fetching-in-nuxt-js-13ad9933524c
