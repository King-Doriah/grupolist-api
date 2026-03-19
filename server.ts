import app from "./app";
import env from "./utils/configs";

const PORT = env.port || 5000;

app.listen(PORT, () => console.log("Server is alive!"));
