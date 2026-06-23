import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { getAuth }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import { getFirestore }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {

apiKey: "AIzaSyDSEmYT1lPfLCzRLyvS9i7IVm1ULbvkONg",

authDomain: "cop20206iran.firebaseapp.com",

projectId: "cop20206iran",

storageBucket: "cop20206iran.firebasestorage.app",

messagingSenderId: "145250732658",

appId: "1:145250732658:web:600b14952a3b32f15d90eb",

measurementId: "G-QYT1PENFJJ"

};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);
