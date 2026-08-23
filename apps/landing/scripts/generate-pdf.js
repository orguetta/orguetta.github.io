import puppeteer from "puppeteer";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const htmlPath = path.join(projectRoot, "public", "resume.html");
const pdfPath = path.join(projectRoot, "public", "resume.pdf");

const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.goto(`file://${htmlPath}`, {
  waitUntil: "networkidle0",
});
await page.pdf({
  path: pdfPath,
  format: "A4",
  printBackground: true,
  preferCSSPageSize: true,
  margin: {
    top: "1cm",
    right: "1cm",
    bottom: "1cm",
    left: "1cm",
  },
});
await browser.close();
