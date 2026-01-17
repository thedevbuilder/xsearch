import PAIN_POINTS from "./painpoint.js";

/**
 * Enhanced Query Builder with Timeframe
 * @param {string} brand - The brand to search
 * @param {string[]} categories - Array of categories to include
 * @param {string} [sinceDate] - Optional date in YYYY-MM-DD format
 */
export default function buildEnhancedQuery(brand, categories = ['support', 'churn', 'frustration'], sinceDate = "") {
    const brandTerm = brand.startsWith('@') ? brand : `"${brand}"`;
    
    // Extract keywords from selected categories
    const selectedKeywords = categories.flatMap(cat => PAIN_POINTS[cat]);
    const logicString = `(${selectedKeywords.join(' OR ')})`;

    // Base query
    let query = `${brandTerm} ${logicString} -is:retweet lang:en`;

    // Append sinceDate if provided
    if (sinceDate) {
        // Validation check (optional but recommended)
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (dateRegex.test(sinceDate)) {
            query += ` since:${sinceDate}`;
        } else {
            console.warn(`Invalid date format: ${sinceDate}. Use YYYY-MM-DD.`);
        }
    }

    return query;
}

 