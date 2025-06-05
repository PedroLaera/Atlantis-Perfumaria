import express from "express";
import userRoutes from "./routes/UserRoutes";
import ProductRoutes from "./routes/ProdutoctRoutes";
import CommentRoutes from "./routes/CommentRoutes";
import CategoryRoutes from "./routes/CategoryRoutes";
import AddressRoutes from "./routes/AddressRoutes";
import LoginRoutes from "./routes/LoginRoutes";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello, World! :)");
});

app.use(express.json());
app.use(userRoutes);
app.use(CategoryRoutes);
app.use(ProductRoutes);
app.use(CommentRoutes);
app.use(AddressRoutes);
app.use(LoginRoutes);

export default app;
