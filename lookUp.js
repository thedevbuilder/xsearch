import {db} from 'src/db';
export async function lookUpCompanyByName(companyHandle) {
 const result = await db.select()
 .from(db.companies)
 .where(db.companies.companyHandle === companyHandle);
 if (result.length === 0 && result[0].isVerifiedUser === false) {
    return false; // Company not found
 }
 return result[0];
}
