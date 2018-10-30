# Sample Vue.js application

This Vue.js application provides the following functionality:

- Authenticate a user using REST API.
- Display a list of work items that is organized by a stix id.
- Able to take action on a list of item.
- Able to take a group-action for a group of items organized by a stix id.

According to the Vue.js website, Vue.js is a progressive JavaScript Framework.

A view component has three (3) sections `template`, `script`, and `style`.
The `template` section contains the structure of the document in HTML format. The `script` section contains the JavaScript code that manipulates
the document. The `style` section contains the `CSS` elements that style
the document in the `template` section.

I employ the following additions to Vue.js for this sample application.
They are:

- `vuetify`: is a material design component framework for Vue.js
- `vuex`: this is a state management pattern & library. 
- `router`: Vue Router is an integral part of Vue.js providing support for
developing a single page application (SPA).
- `axios`: it is a promise based HTTP client for the browser & node.js


- install vue 3
  - sudo npm install -g @vue/cli

- install webpack
  - npm install webpack webpack-cli --save-dev
  - npm install --save-dev vue-jest
  - npm install --save-dev babel-jest
  - npm install --save-dev vue-router
  - npm install -g vue-router
  - sudo npm install -g vue-router
  - npm install --save vue-router
  - npm install --save axios
  - npm install --save vuetify
  - vue add vuetify

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

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```


---- 
Notes:

[HMR] Waiting for update signal from WDS...
Login.vue is created.
hrItems is null!

Login with: User1:Pass1
*** calling users.signIn() begins
*** calling axios.put() begins
*** calling axios.put() ends
*** calling users.signIn() ends
=== login completes successfully: undefined
*** HumanReview.vue is created ...
retrieveHrItems() ...

axios.put completes successfully!

Updated token Random-0.9113865364306137

retrieveHrItems() ...

authToken:  Random-0.9113865364306137

hrItems length: 90