import { getMatches } from "./api.js";
const API_KEY = "d5607c2a5b90d9ae38708b37a1610be0";

export async function getMatches(){

const response = await fetch(
"https://v3.football.api-sports.io/fixtures?next=20",
{
headers:{
"x-apisports-key": API_KEY
}
}
);

const data = await response.json();

return data.response;

}
async function loadMatches(){

const matchesDiv =
document.getElementById("matches");

matchesDiv.innerHTML = "در حال بارگذاری...";

try{

const matches =
await getMatches();

matchesDiv.innerHTML = "";

matches.forEach(match=>{

matchesDiv.innerHTML += `

<div style="
padding:10px;
margin:10px 0;
background:#1F2937;
border-radius:10px;
">⚽ ${match.teams.home.name}

vs

${match.teams.away.name}

<br><br>

🕒 ${new Date(
match.fixture.date
).toLocaleString("fa-IR")}

</div>
`;});

}catch(error){

matchesDiv.innerHTML =
"خطا در دریافت مسابقات";

}

}
