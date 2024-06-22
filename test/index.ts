import { formatRoute } from "../src/index";

const app = document.createElement("div");
app.id = "app";
app.style.width = "100vw";
app.style.height = "100vh";
app.style.display = "flex";
app.style.alignItems = "center";
app.style.justifyContent = "center";

app.innerText = String(formatRoute("123"));

document.body.appendChild(app);
