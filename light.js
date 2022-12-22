const lighthouse = require("lighthouse");
const chromeLauncher = require("chrome-launcher");

(async () => {
  const chrome = await chromeLauncher.launch({ chromeFlags: ["--headless"] });
  const options = {
    logLevel: "info",
    output: "json",
    onlyCategories: ["performance"],
    port: chrome.port,
  };
  const runnerResult = await lighthouse("https://www.amazon.in/", options);

  // `.report` is the Json report as a string
  const reportJson = runnerResult.report;
  fs.writeFileSync("4hreport.json", reportJson);

  // `.lhr` is the Lighthouse Result as a JS object
  // console.log("Report is done for", runnerResult.2hr.finalDisplayedUrl);
  // console.log(
  //   "Performance score was",
  //   runnerResult.2hr.categories.performance.score * 100
  // );

  await chrome.kill();
})();
