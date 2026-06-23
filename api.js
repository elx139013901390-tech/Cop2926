const API_KEY = "d5607c2a5b90d9ae38708b37a1610be0";

export async function getMatches(){

try{

const response = await fetch(
"https://v3.football.api-sports.io/fixtures?next=20",
{
headers:{
"x-apisports-key":API_KEY
}
}
);

const data = await response.json();

return data.response;

}catch(error){

console.log(error);

return [];

}

}
