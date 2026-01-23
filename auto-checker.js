import { configDotenv } from "dotenv";
  configDotenv();
 export default  async function isVerifiedUser(companyHandle) {
  // tracking 3rd party api rate limits and errors 
  let response;
   try {
  response = await fetch(
  "https://api.desearch.ai/twitter/user/posts?username=" + companyHandle,
  {
    method: "GET",
    headers: {
      "Authorization": process.env.X_API_KEY,
      "Content-Type": "application/json"
    }
  }
);
 if (!response.ok) {  
    throw new Error(`API request failed with status ${response.status}`);
  }

} catch (error) {
    throw error
 }
try{
    const data = await response.json();
      if (!data || data.length === 0) {
        throw new Error("No data found for the given company handle.");
}
 return [data.user.name,
  data.user.is_blue_verified,
  data.user.username];
}
 catch (error) {
    throw error;
}  
}
