import { pipeline } from '@xenova/transformers';
 export default async function processTwitterData(rawData) {
console.log("Initializing AI Classifier...");
    
    // 1. Initialize once outside the loop
    const classifier = await pipeline('zero-shot-classification', 'Xenova/distilbert-base-uncased-mnli');
  const targetLabels = ['frustration', 'needing support', 'dissatisfaction'];

    // 2. Use a standard loop instead of Promise.all to prevent buffer overlap
    const cleanedData = [];
    
    for (let i = 0; i < rawData.length; i++) {
        const tweet = rawData[i];
        const user = tweet.user || {};
        
        try { 
            // Run classification one by one
            const output = await classifier(tweet.text, targetLabels);
            if(output.scores[i]>0){
                cleanedData.push({
                    id: i + 1,
                    username: user.name,
                    userhandle: user.username,
                    text: tweet.text,
                    location: user.location || "Not visible",
                    aiLabel: output.labels[0],
                    aiScore: output.scores[0]
                });
                console.log(`✅ MATCH FOUND: "${output.text}"`);
            }
            else{
                    console.log(`❌ FILTERED OUT: "${output.text}"`);
            }
        } catch (err) {
            console.error(`Error processing tweet ${i}:`, err);
        }
    }

    return cleanedData;
}