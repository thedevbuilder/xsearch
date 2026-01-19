import {db} from 'src/db';
export async function insertDb(companyName, companyHandle,verified,twitterData) {
    try {
        await db.insert(db.companies).values({
        name: companyName,
        companyHandle: companyHandle,
        isVerifiedUser: verified,
        twitterData: twitterData,
        dataUpdatedAt: new Date()
    });
    } catch (error) {
         throw error
    }

     
 }
