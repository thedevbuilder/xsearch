import fs from 'fs/promises';

export default async function writeToJsonFile(filename, data) {
  try {
    // 1. Convert JavaScript object to a formatted JSON string
    // The 'null, 2' arguments add nice indentation (2 spaces)
    const jsonString = JSON.stringify(data, null, 2);

    // 2. Write the file to disk
    await fs.writeFile(filename, jsonString, 'utf8');
    
    console.log(`Successfully wrote to ${filename}`);
  } catch (error) {
    console.error("Error writing file:", error.message);
  }
}

// Example usage:
const myData = {
  name: "User",
  id: 123,
  status: "active"
};

