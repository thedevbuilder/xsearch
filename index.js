import * as All from "./querybuild.js"
import search from "./xsearch.js"
import processTwitterData from "./PD.js"
import isVerifiedUser from "./auto-checker.js"
import { lookUpCompanyByName } from "./lookUp.js"
import { insertDb } from "./insertDb.js"
import writeFile from "./writefile.js"
import PAIN_POINTS from "./painpoint.js"
  /**
 * Processes a user's subscription status.
 * @param {Object} companyName - The X company name
 * @param {string[]} categories - Array of categories to include
 * @param {string} sinceDate - Optional date in YYYY-MM-DD format
  */

 async function InitializeAll(companyHandle,categories=['churn'],sinceDate){

   const companyRecord = await lookUpCompanyByName(companyHandle,categories,sinceDate);
   //  if company not found in db proceed to check if verified and search
   if (!companyRecord) {
      let output;
      const  response = await isVerifiedUser(companyHandle);
       const [name,verified,Handle] =  response
 
      try{
    if(verified){
    output = await search.twitterSearch({
     query: All.default(Handle,categories,sinceDate),
     sort: 'Latest',
     count:20
     
      }) 
      // collect and write raw output to file for debugging
      await writeFile('data.json', output);
      if(output.length === 0){
        throw new Error("No tweets found for the given company handle.");
      }
      
      const rankedResults = await processTwitterData(output,sinceDate);
      await insertDb(name,Handle,rankedResults[0]);
      return rankedResults       
    }
     }catch(err){
         throw err
      }

     }
     //  else return existing record
     return companyRecord     
 }
console.log(InitializeAll("glovoapp_ng",['churn'],'2025-01-01'))
/*
1. Take the company name or handle as input. ✅
2. check if the company exists in the database.
3. If it exists, return the existing record.
4. If it doesn't exist, build a search query using the company handle and specified categories.
5. Perform a Twitter search using the constructed query.
6. Process the retrieved tweets using an AI classifier to filter and label them.
7. Store the processed results in the database along with company details.
8. if tweet data is stale reprocess and update the record.
8. Return the newly stored record.
*/