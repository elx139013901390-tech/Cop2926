import {
query,
where,
getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import {
addDoc,
collection
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
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
async function loadMatches(){

const matchesDiv =
document.getElementById("matches");

matchesDiv.innerHTML =
"در حال دریافت مسابقات...";

const matches =
await getMatches();

matchesDiv.innerHTML = "";

matches.forEach(match=>{

matchesDiv.innerHTML += `

<div class="leader"><span>
${match.teams.home.name}
</span><span>
vs
</span><span>
${match.teams.away.name}
</span></div>`;

});

}
window.predict = async function(
fixtureId,
prediction,
matchTime
){

const user = auth.currentUser;

if(!user){

alert("ابتدا وارد شوید");
return;

}

/* قفل 10 دقیقه قبل بازی */

const now = new Date();

const start = new Date(matchTime);

const diffMinutes =
(start - now) / 1000 / 60;

if(diffMinutes <= 10){

alert("⛔ پیش‌بینی بسته شده است");

return;

}

/* بررسی پیش‌بینی قبلی */

const q = query(
collection(db,"predictions"),
where("userId","==",user.uid),
where("fixtureId","==",fixtureId)
);

const existing =
await getDocs(q);

if(!existing.empty){

alert("⚠️ شما قبلاً پیش‌بینی کرده‌اید");

return;

}

await addDoc(
collection(db,"predictions"),
{
userId:user.uid,
fixtureId,
prediction,
createdAt:Date.now()
}
);

alert("✅ پیش‌بینی ثبت شد");

}
