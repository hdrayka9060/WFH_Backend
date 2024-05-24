
import cors,{ CorsOptions } from "cors";

const corsOptions: CorsOptions = {
    origin: (origin:string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
            if (1) {
            callback(null, true);
        } else {
            console.log(`Origin ${origin} has requested and is not allowed.`);
            callback(new Error("Unauthorized"));
        }
    },
};

const corsMiddleware=cors(corsOptions);
export default corsMiddleware;