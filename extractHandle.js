export default function extractHandle(url) {
const regex = /(?<=\.com\/)[^\s\?\/"]+/;
const username = url.match(regex)?.[0];
  console.log(username);
  return username;
}



