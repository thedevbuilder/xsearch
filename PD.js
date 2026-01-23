import { pipeline } from '@xenova/transformers';
import compareDate from './compareDate.js';
import json from "./data.json" with { type: "json" };
 export default async function processTwitterData(rawData,sinceDate) {
    console.log("Initializing AI Classifier...");
    
    // 1. Initialize the model
    const classifier =  await pipeline("sentiment-analysis", "Xenova/distilbert-base-uncased-finetuned-sst-2-english");
    const CONFIDENCE_THRESHOLD = 0.75;
    const cleanedData = [];
// Adjust this: lower = more matches, higher = more accurate

    for (let i = 0; i < rawData.length; i++) {
        const tweet = rawData[i];
        const user = tweet.user || {};
        const text = tweet.text || "";
        
        try { 
            // 2. KEYWORD OVERRIDE (Fixes the "omitted sentences" problem)
            // If the text contains the exact label, we skip the AI and mark it 100%
            let finalLabel = null;
            let finalScore = 0;
            
                // 3. AI CLASSIFICATION (Only if no keyword match)
                const output = await classifier(text);
                 finalLabel = output[0].label; // Highest probability label
                finalScore = output[0].score; // Highest probability score

            // 4. Filtering based on the score
            if (finalScore >= CONFIDENCE_THRESHOLD && compareDate(tweet.created_at,sinceDate)) {
                cleanedData.push({
                    id: user.id,
                    username: user.name,
                    userhandle: user.username,
                    about:user.description,
                    profile_image: user.profile_image_url,
                    can_direct_message: user.can_dm,
                    text: text,
                    url:tweet.url,
                    location: user.location || "Not visible",
                    aiLabel: finalLabel,
                    aiScore: finalScore
                });
                console.log(` [${tweet.created_at}]:✅ ACCEPTED [${finalLabel}]: "${text.substring(0, 30)}..."`);
            } else {
                console.log(`❌ IGNORED (Low Confidence ${Math.round(finalScore * 100)}% Or Stale Data ): "${text.substring(0, 30)}..."`);
            }

        } catch (err) {
            console.error(`Error processing tweet ${i}:`, err);
        }
    }

    return [cleanedData];
}

async function a(){
     await processTwitterData(json,'2025-11-01');
}
a()