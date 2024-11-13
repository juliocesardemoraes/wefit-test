import { AppDataSource } from "./database/data-source.js";
import { app } from "./index.js";

(async () => {
  await AppDataSource.initialize()
    .then(async () => {
      console.log("Database working");
    })
    .catch((error) => console.log("DB conn ERROR: ", error));
})();

const port = process.env.PORT || 4568;

app.listen(port, () => console.log(`Server is running on PORT ${port}`));
