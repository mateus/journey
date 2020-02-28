import firebaseMock from 'firebase-mock';

const mockauth = new firebaseMock.MockAuthentication();
const mockfirestore = new firebaseMock.MockFirestore();
export const mocksdk = new firebaseMock.MockFirebaseSdk(
  // use null if your code does not use RTDB
  () => null,
  // use null if your code does not use AUTHENTICATION
  () => {
    return mockauth;
  },
  // use null if your code does not use FIRESTORE
  () => {
    return mockfirestore;
  },
  // use null if your code does not use STORAGE
  () => null,
  // use null if your code does not use MESSAGING
  () => null,
);
