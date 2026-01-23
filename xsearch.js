import desearch from "desearch-js"
import { configDotenv } from "dotenv"
configDotenv()
const search = new desearch(process.env.X_API_KEY)
export default search
