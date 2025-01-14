import { BlueFoxDomGate } from "../src/index.js";

await BlueFoxDomGate.connect(
  "./index.html",
  "./",
  "./dist/o.html",
  10000,
  true,
  true,
);