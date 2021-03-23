import express from "express";
import { requestLogger } from "./middlewares/requestLogger";
import routes from "./routes/routes";

const PORT = 3001;
const app = express();
app.use(express.json());
app.use(requestLogger);
app.use(routes);

app.listen(3001, () => {
  console.log("🚀 Server listening on: http://127.0.0.1:" + PORT);
});
