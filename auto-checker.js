import { configDotenv } from "dotenv";
import extractHandle from "./extractHandle.js";
configDotenv();
 export default  async function isVerifiedUser(companyHandle) {
    try {
const response = await fetch(
  "https://api.desearch.ai/twitter/user/posts?username=" + companyHandle,
  {
    method: "GET",
    headers: {
      "Authorization": process.env.API_KEY,
      "Content-Type": "application/json"
    }
  }
);

//  suspectible to errors if response is not ok
const data = await response.json();
const [username,verified,url] = data
const extractHandle = extractHandle(url);
return [username,verified,extractHandle]
// return [username, verified,extractHandle];
} catch (error) {
    console.error("Error checking verified company handle:", error);
    return false;
}     
}
