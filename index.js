const fs = require("fs");
// const path = require("path");
const excelJS = require("exceljs");

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// First to read the file
storedData = [];

url1 = "https://www.amazon.in/";
var filesToBeRead = [
  "./lhreport.json",
  "./2hreport.json",
  "./3hreport.json",
  "./4hreport.json",
];
function read(filesToBeRead) {
  require("fs").readFile(filesToBeRead, "utf8", (error, data) => {
    if (error) {
      console.log("error is", error);
    }
    const content = JSON.parse(data);

    // console.log(content.audits.viewport.score);
    let speed_index = content.audits["speed-index"].displayValue;
    let first_cotentful_paint =
      content.audits["first-contentful-paint"].displayValue;
    let total_blocking_time =
      content.audits["total-blocking-time"].displayValue;
    let time_to_interactive = content.audits["interactive"].displayValue;
    let largest_contentful_paint =
      content.audits["largest-contentful-paint"].displayValue;
    let cumulative_layout_shift =
      content.audits["cumulative-layout-shift"].displayValue;
    // console.log("sp", speed_index);
    // console.log("fcp", first_cotentful_paint);
    // console.log(total_blocking_time);
    // console.log(time_to_interactive);
    // console.log(largest_contentful_paint);
    // console.log(cumulative_layout_shift);
    storedData.push({
      speed_index: speed_index,
      total_blocking_time: total_blocking_time,
      first_cotentful_paint: first_cotentful_paint,
      time_to_interactive: time_to_interactive,
      largest_contentful_paint: largest_contentful_paint,
      cumulative_layout_shift: cumulative_layout_shift,
    });

    console.log("This is the Stored Data", storedData);
    // stringify JSON Object
    var jsonContent = JSON.stringify(storedData);
    console.log(storedData);

    fs.writeFile("output.json", jsonContent, "utf8", (err) => {
      if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
      }

      console.log("JSON file has been saved.");
    });
  });
}
for (var i = 0; i < filesToBeRead.length; i++) {
  read(filesToBeRead[i]);
}
// reading json file ehich contains all core web vitals
fs.readFile("./output.json", "utf-8", (err, data) => {
  if (err) {
    throw err;
  }
  const content = JSON.parse(data);

  console.log("this is the Main content", content);
  const speedIndexArray = [];
  const totalBlockingTimeArray = [];
  const firstCotentfulPaintArray = [];
  const timeToInteractiveArray = [];
  const largestContentfulPaintArray = [];
  const cumulativeLayoutShiftArray = [];

  for (var i = 0; i < content.length; i++) {
    console.log("content of i", content[i].speed_index);

    speedIndexArray.push(content[i].speed_index);
    totalBlockingTimeArray.push(content[i].total_blocking_time);
    firstCotentfulPaintArray.push(content[i].first_cotentful_paint);
    timeToInteractiveArray.push(content[i].time_to_interactive);
    largestContentfulPaintArray.push(content[i].largest_contentful_paint);
    cumulativeLayoutShiftArray.push(content[i].cumulative_layout_shift);
  }
  console.log("sA", speedIndexArray);
  console.log("TBT", totalBlockingTimeArray);
  console.log("fcpA", firstCotentfulPaintArray);
  console.log("TTI", timeToInteractiveArray);
  console.log("LCP", largestContentfulPaintArray);
  console.log("CLS", cumulativeLayoutShiftArray);
  // const average = speedIndexArray.reduce((a, b) => a + b, 0);

  // console.log(average);
  ////////answer
  ///////////////////speed index average data
  const sumSI = speedIndexArray.reduce((sumSI, str) => {
    const num = Number(str.match(/\d/g).join(""));
    // console.log("sumsi", sumSI);
    // console.log("numSI", num);
    return sumSI + num / 10;
  }, 0);
  const averageSI = sumSI / filesToBeRead.length;
  console.log("sum", sumSI);
  console.log("average of speed index", averageSI);
  /////////////////////////////Total Blocking Time Average
  const sumTBT = totalBlockingTimeArray.reduce((sumTBT, str) => {
    const num = Number(str.match(/\d/g).join(""));
    return sumTBT + num;
  }, 0);
  const averageTBT = sumTBT / filesToBeRead.length;
  console.log("sum TBT", sumTBT);
  console.log("average of Total Blocking Time", averageTBT);
  /////////////////////////////first Contentfull Paint average
  const sumFCP = firstCotentfulPaintArray.reduce((sumFCP, str) => {
    const num = Number(str.match(/\d/g).join(""));
    return sumFCP + num / 10;
  }, 0);
  const averageFCP = sumFCP / filesToBeRead.length;
  console.log("sum", sumFCP);
  console.log("Average of First Contentfull Paint", averageFCP);
  /////////////////////////////Time To Interactive Average
  const sumTTI = timeToInteractiveArray.reduce((sumTTI, str) => {
    const num = Number(str.match(/\d/g).join(""));
    return sumTTI + num / 10;
  }, 0);
  const averageTTI = sumTTI / filesToBeRead.length;
  console.log("sumTTI", sumTTI);
  console.log("Average of Time To Interactive", averageTTI);
  ////////////////////////////////Largest Contentfull Paint Average
  const sumLCP = largestContentfulPaintArray.reduce((sumLCP, str) => {
    const num = Number(str.match(/\d/g).join(""));
    return sumLCP + num / 10;
  }, 0);
  const averageLCP = sumLCP / filesToBeRead.length;
  console.log("sumLCP", sumLCP);
  console.log("Average of Largest Contentfull Paint", averageLCP);
  ////////////////////////////////cumulative Layout Shift Average
  const sumCLS = cumulativeLayoutShiftArray.reduce((sumCLS, str) => {
    const num = Number(str.match(/\d/g).join(""));
    return sumCLS + num / 10;
  }, 0);
  const averageCLS = sumCLS / filesToBeRead.length;
  console.log("sumCLS", sumCLS);
  console.log("Average of Cumulative Layout Shift", averageCLS);

  // let speed_index = content[0]["speed_index"];
  // // console.log("asdasffg", content);
  // let first_cotentful_paint = content[0]["first_cotentful_paint"];
  // let total_blocking_time = content[0]["total_blocking_time"];
  // let time_to_interactive = content[0]["time_to_interactive"];
  // let largest_contentful_paint = content[0]["largest_contentful_paint"];
  // let cumulative_layout_shift = content[0]["cumulative_layout_shift"];

  const webVitals = [
    {
      WV: "speed_index",
      value: averageSI,
      value2: "sec",
    },
    {
      WV: "first_cotentful_paint",
      value: averageFCP,
      value2: "sec",
    },
    {
      WV: "total_blocking_time",
      value: averageTBT,
      value2: "ms",
    },
    {
      WV: "time_to_interactive",
      value: averageTTI,
      value2: "Sec",
    },
    {
      WV: "largest_contentful_paint",
      value: averageLCP,
      value2: "Sec",
    },
    {
      WV: "cumulative_layout_shift",
      value: averageCLS,
      value2: "Sec",
    },
  ];
  // pushing the data to excel
  const workbook = new excelJS.Workbook(); // Create a new workbook
  const worksheet = workbook.addWorksheet("Core Web Vitals"); // New Worksheet
  const path = "./files";

  worksheet.columns = [
    { header: "S no.", key: "s_no", width: 10 },
    { header: "Core Web Vitals", key: "WV", width: 30 },
    { header: "Value", key: "value", width: 10 },
    { header: "Time", key: "value2", width: 5 },
  ];
  //   // Looping through webvitals data
  let counter = 1;
  webVitals.forEach((webVitals) => {
    webVitals.s_no = counter;
    worksheet.addRow(webVitals); // Add data in worksheet
    counter++;
  });
  // Making first line in excel bold
  worksheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true };
  });
  timestamp = new Date().getTime().toString();
  workbook.xlsx.writeFile(`${path}/FINAL REPORT ${timestamp}.xlsx`);
});

////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
// fs.readFile("./2hreport.json", "utf-8", function read(err, data) {
//   if (err) {
//     throw err;
//   }
//   const content = JSON.parse(data);
//   // console.log(content.audits.viewport.score);
//   let speed_index = content.audits["speed-index"].displayValue;
//   let first_cotentful_paint =
//     content.audits["first-contentful-paint"].displayValue;
//   let total_blocking_time = content.audits["total-blocking-time"].displayValue;
//   let time_to_interactive = content.audits["interactive"].displayValue;
//   let largest_contentful_paint =
//     content.audits["largest-contentful-paint"].displayValue;
//   let cumulative_layout_shift =
//     content.audits["cumulative-layout-shift"].displayValue;
//   console.log("sp", speed_index);
//   console.log("fcp", first_cotentful_paint);
//   console.log(total_blocking_time);
//   console.log(time_to_interactive);
//   console.log(largest_contentful_paint);
//   console.log(cumulative_layout_shift);
//   const webVitals = [
//     {
//       WV: "speed_index",
//       value: speed_index,
//     },
//     {
//       WV: "first_cotentful_paint",
//       value: first_cotentful_paint,
//     },
//     {
//       WV: "total_blocking_time",
//       value: total_blocking_time,
//     },
//     {
//       WV: "time_to_interactive",
//       value: time_to_interactive,
//     },
//     {
//       WV: "largest_contentful_paint",
//       value: largest_contentful_paint,
//     },
//     {
//       WV: "cumulative_layout_shift",
//       value: cumulative_layout_shift,
//     },
//   ];

//   // pushing the data to excel
//   const workbook = new excelJS.Workbook(); // Create a new workbook
//   const worksheet = workbook.addWorksheet("Core Web Vitals"); // New Worksheet
//   const path = "./files";

//   worksheet.columns = [
//     { header: "S no.", key: "s_no", width: 10 },
//     { header: "Core Web Vitals", key: "WV", width: 30 },
//     { header: "Value", key: "value", width: 10 },
//   ];
//   //   // Looping through webvitals data
//   let counter = 1;
//   webVitals.forEach((webVitals) => {
//     webVitals.s_no = counter;
//     worksheet.addRow(webVitals); // Add data in worksheet
//     counter++;
//   });
//   // Making first line in excel bold
//   worksheet.getRow(1).eachCell((cell) => {
//     cell.font = { bold: true };
//   });
//   timestamp = new Date().getTime().toString();
//   workbook.xlsx.writeFile(`${path}/Cwv ${timestamp}.xlsx`);
// });

// function processFile(content) {
//   console.log(content);
// }
// const data = fs.readFileSync("./lhreport.json");
// fs.readFile("./lhreport.json");
// data1 = JSON.parse(data);
// console.log("the required data is", data1["first - contentful - paint"]);
// console.log(data);
