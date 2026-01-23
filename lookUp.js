import {db} from './src/db/index.ts';
import { updateDb } from './insertDb.js';
import * as All from "./querybuild.js"
import search from "./xsearch.js"
import processTwitterData from "./PD.js"
import { eq } from 'drizzle-orm';
import { companies } from './src/db/schema.ts';
 export async function lookUpCompanyByName(companyHandle,categories) {
const twoweeksAgo = new Date();
twoweeksAgo.setDate(twoweeksAgo.getDate() - 14);

// This gives you "yyyy-mm-dd"
const formattedDate = twoweeksAgo.toISOString().split('T')[0];
try{
  const result = await db.select()
 .from(companies)
 .where(eq(companies.companyHandle, companyHandle));
   if (result.length === 0 || result[0].isVerifiedUser === false) {
    return false; // Company not found
 }
  //////
 const output = await search.twitterSearch({
     query: All.default(companyHandle,categories,formattedDate),
     sort: 'Top',
     count:20
      }) 
      const rankedResults = await processTwitterData(output);
      await updateDb(companyHandle,rankedResults[1],rankedResults[0])
      return rankedResults       
  ///////
 return result[0];
}catch(err){
    console.error("Error querying the database:", err);
    throw err;
 }
}
