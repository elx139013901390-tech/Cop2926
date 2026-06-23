const API_KEY = "YOUR_API_KEY";

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
