import {db} from './src/db/index.ts';
import { companies } from './src/db/schema.ts';
import { eq } from 'drizzle-orm';
 export async function insertDb(companyName, companyHandle,twitterData) {
    
    try {
        await db.insert(companies).values({
        name: companyName,
        companyHandle: companyHandle,
         twitterData: twitterData,
        lastUpdated: new Date()
    });
    } catch (error) {
         throw error
    }

     
 }
 export async function updateDb(companyHandle,twitterData) {
    try {
     const existingRecord = await db.select().from(companies).where(eq(companies.companyHandle, companyHandle));
        if (existingRecord.length === 0) {
            throw new Error(`Company with handle ${companyHandle} does not exist.`);
        }
    let history = existingRecord[0]?.twitterData || [];
    // new entry 
    const entry = history.push(twitterData);
  
        await db.insert(companies)   
        .values({
         twitterData: entry,
        lastUpdated: new Date()
    })
    .where(eq(companies.companyHandle, companyHandle));
    } catch (error) {
            throw error
    }
     
 }
