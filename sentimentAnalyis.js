import { pipeline } from "@xenova/transformers";
import json from "./data.json" with { type: "json" };
const sentimentPipeline = await pipeline("sentiment-analysis", "Xenova/distilbert-base-uncased-finetuned-sst-2-english");
export async function analyzeSentiment(text) {  
    const result = await sentimentPipeline(text);  
    return result; 
};
for(let i=0;i<json.length;i++){
const results = await analyzeSentiment(json[i].text);

console.log(results);
}