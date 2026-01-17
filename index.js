import * as All from "./querybuild.js"
import search from "./xsearch.js"
import processTwitterData from "./PD.js"

 async function InitializeAll(){
 /**
 * Processes a user's subscription status.
 * @param {Object} userinput - The user input
 * @param {string} user.query - query of the user on x
 * @param {string} user.sort -  Required sort either "Top" OR "Latest"
 * @param {number} user.count -  number limited basd set would be based on user subscription

  */
    const userinput ={
     query: All.default('NotionHQ',["frustration"],'2021-01-01'),
     sort: 'Top',
     count:10
   }
   // debugging
   const output = await search.twitterSearch(userinput)
    const rankedResults = await processTwitterData(output)
    console.log('processing data',rankedResults)
    return rankedResults
 }
console.log(InitializeAll())



 

/*
 username,
 userhandle,
 profile link,
 profile img,
 text what users says on the tweet,
 description,
 nationality if data is visible
 location if visible
*/