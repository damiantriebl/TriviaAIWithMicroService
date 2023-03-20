import { PORT } from "./env.js";
import ExpressConfig from "./Express/express.config.js";
import { ChatGPTRouter } from "./routes/chatapi.Router.js";
const app = ExpressConfig();
app.use(ChatGPTRouter);
app.listen(PORT, () => console.log("Server Running on Port " + PORT));
//# sourceMappingURL=server.js.map