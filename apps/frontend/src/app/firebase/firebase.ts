import { initializeApp } from "@firebase/app";
import { getStorage } from "@firebase/storage";


const firebaseConfig = {
  authDomain: "nx-firebase-template-test.firebaseapp.com",
  databaseURL: "https://nx-firebase-template-test-default-rtdb.firebaseio.com",
  projectId: "nx-firebase-template-test",
  storageBucket: "nx-firebase-template-test.appspot.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);