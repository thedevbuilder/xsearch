import {pgTable,serial,text,jsonb,timestamp} from 'drizzle-orm/pg-core';
 export const companies = pgTable('companies',{
    id: serial('id').primaryKey().unique(),
    name: text('name').notNull().unique(),
    companyHandle: text('company_handle').notNull().unique(),
     twitterData: jsonb('twitter_data'),
    lastUpdated: timestamp('last_updated').notNull().defaultNow(),
});