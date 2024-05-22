
import cors,{ CorsOptions } from "cors";

const allowOrigin="http://localhost:3000";

const corsOptions: CorsOptions = {
    origin: (origin:string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
        // if (!origin || allowOrigin) {
            if (!origin || 1) {
            // console.log(`Origin ${origin} has requested and is allowed.`);
            callback(null, true);
        } else {
            console.log(`Origin ${origin} has requested and is not allowed.`);
            callback(new Error("Unauthorized"));
        }
    },
};

const corsMiddleware=cors(corsOptions);
export default corsMiddleware;