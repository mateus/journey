![Node.js CI](https://github.com/mateus/journey/workflows/Node.js%20CI/badge.svg)
![Build and Deploy](https://github.com/mateus/journey/workflows/Build%20and%20Deploy/badge.svg)
![Lint](https://github.com/mateus/journey/workflows/Lint/badge.svg)

### Development

1. Add local variables with the Firebase configuration.

```
# .env
REACT_APP_API_KEY='api-key'
REACT_APP_AUTH_DOMAIN='project-id.firebaseapp.com'
REACT_APP_DATABASE_URL='https://project-id.firebaseio.com'
REACT_APP_PROJECT_ID='project-id'
REACT_APP_STORAGE_BUCKET='project-id.appspot.com'
REACT_APP_MESSAGING_SENDER_ID='sender-id'
REACT_APP_APP_ID='app-id'
REACT_APP_MEASUREMENT_ID='G-measurement-id'
```

2. Install dependencies

`$ yarn install`

3. Run project

`$ yarn start`

4. Test it

`$ yarn test {file}`
