import { auth, db } from "./firebase.js";

import {
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
onAuthStateChanged
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
doc,
setDoc,
getDoc
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/* ثبت نام */

window.registerUser = async function(){

const email =
document.getElementById("email").value;

const password =
document.getElementById("password").value;

try{

const result =
await createUserWithEmailAndPassword(
auth,
email,
password
);

await setDoc(
doc(db,"users",result.user.uid),
{
email:email,
coins:1000,
points:0,
role:"user",
banned:false
}
);

alert("ثبت نام موفق ✅");

}catch(error){

alert(error.message);

}

};

/* ورود */

window.loginUser = async function(){

const email =
document.getElementById("email").value;

const password =
document.getElementById("password").value;

try{

await signInWithEmailAndPassword(
auth,
email,
password
);

alert("ورود موفق ✅");

}catch(error){

alert(error.message);

}

};

/* نمایش پروفایل */

onAuthStateChanged(
auth,
async(user)=>{

if(!user) return;

const snap =
await getDoc(
doc(db,"users",user.uid)
);

if(!snap.exists()) return;

const data = snap.data();

document.getElementById("userEmail")
.innerText =
"ایمیل: " + data.email;

document.getElementById("coins")
.innerText =
data.coins || 0;

document.getElementById("points")
.innerText =
data.points || 0;

});
