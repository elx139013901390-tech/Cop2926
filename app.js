import { getMatches } from "./api.js";
import { auth, db } from "./firebase.js";

import {
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
onAuthStateChanged,
signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
doc,
setDoc,
getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/* ثبت نام */

window.registerUser = async function(){

const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

if(!email || !password){
alert("ایمیل و رمز را وارد کنید");
return;
}

try{

const result = await createUserWithEmailAndPassword(
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
createdAt:Date.now()
}
);

alert("ثبت نام موفق");

}catch(error){

alert(error.message);

}

};

/* ورود */

window.loginUser = async function(){

const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

try{

await signInWithEmailAndPassword(
auth,
email,
password
);

}catch(error){

alert(error.message);

}

};

/* خروج */

window.logoutUser = async function(){

await signOut(auth);

};

/* وضعیت کاربر */

onAuthStateChanged(auth, async(user)=>{

if(!user){

return;

}

const ref = doc(db,"users",user.uid);

const snap = await getDoc(ref);

if(snap.exists()){

const data = snap.data();

document.getElementById("userEmail").innerText =
"ایمیل: " + data.email;

}

});

import {
collection,
getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/* Leaderboard */

async function loadLeaderboard(){

const board = document.getElementById("leaderboard");

const snapshot = await getDocs(
collection(db,"users")
);

let users = [];

snapshot.forEach((docSnap)=>{

users.push(docSnap.data());

});

users.sort((a,b)=>
(b.points || 0) - (a.points || 0)
);

board.innerHTML = "";

users.forEach((user,index)=>{

board.innerHTML += `

<div class="leader">
<span>#${index+1}</span>
<span>${user.email}</span>
<span>${user.points || 0} امتیاز</span>
</div>
`;});

}
