import { initializeApp } from "@firebase/app";
import { getStorage } from "@firebase/storage";


const firebaseConfig = {
  authDomain: "nxfirebasetemplate.firebaseapp.com",
  databaseURL: "https://nxfirebasetemplate-default-rtdb.firebaseio.com",
  projectId: "nxfirebasetemplate",
  storageBucket: "nxfirebasetemplate.appspot.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);