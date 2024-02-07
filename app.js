console.log("Is this thing on?");

// create some constants and variables to use later
const viz = document.getElementById("tableauViz");
// let- constant- this is more flexible this can be one thing and changed later
// const- constant- can't be changed
// var- old version
let workbook;
let vizActiveSheet;
let dashboard;
let listSheets;

// defining sheets
let saleMap;
let totalSales;
let salesByProduct;
let salesBySegment;

// logging information about the workbook
function logWorkbookInformation() {
  // get the workbook
  workbook = viz.workbook;
  console.log(`The workbook name is "${workbook.name}"`);

  // get the array (Tabs) of dashboards and stand-alone sheets
  let sheets = workbook.publishedSheetsInfo;
  sheets.forEach((element) => {
    index = element.index;
    console.log(`The sheet with index
    [${index}] is : "${element.name}"`);
  });
  // gets the currently active sheet (active tab)
  vizActiveSheet = workbook.activeSheet;
  listSheets = vizActiveSheet.worksheets;
  console.log(`The active sheet is "${vizActiveSheet.name}"`);

  // sheets in the dashboard
  // for each - loops which gets all the sheets
  listSheets = vizActiveSheet.worksheets;
  listSheets.forEach((element) => {
    index = element.index;
    worksheetName = element.name;
    console.log(`The worksheet with index  [${index}] is : "${worksheetName}"`);
  });

  //   assign sheets to the variables for the sheetnames at the top of the app.js file
  saleMap = listSheets.find((ws) => ws.name == "SaleMap");
  totalSales = listSheets.find((ws) => ws.name == "Total Sales");
  salesByProduct = listSheets.find((ws) => ws.name == "SalesbyProduct");
  salesBySegment = listSheets.find((ws) => ws.name == "SalesbySegment");
}

//  log this information  once things are actually loaded
// interact with html- add eventlistner- this finds when the page is minimally active- testing it but when the workbook is not currently loaded in
viz.addEventListener("firstinteractive", logWorkbookInformation);

// define what our buttons are
const oregonWashingtonButton = document.getElementById("oregon_and_washington");
const clearFilterButton = document.getElementById("clear_filter");
const undoButton = document.getElementById("undo");

// what the buttons do when click
oregonWashingtonButton.addEventListener(
  "click",
  function oregonWashFunction(e) {
    //   log what is pressed
    console.log(e.target.value);

    //apply the filter to all of the sheets- washington and oregon
    saleMap.applyFilterAsync("State", ["Washington", "Oregon"], "replace");
    totalSales.applyFilterAsync("State", ["Washington", "Oregon"], "replace");
    salesByProduct.applyFilterAsync(
      "State",
      ["Washington", "Oregon"],
      "replace"
    );
    salesBySegment.applyFilterAsync(
      "State",
      ["Washington", "Oregon"],
      "replace"
    );
  }
);

clearFilterButton.addEventListener("click", function clearstate(e) {
  // log what was pressed
  console.log(e.target.value);

  saleMap.clearFilterAsync("State");
  totalSales.clearFilterAsync("State");
  salesByProduct.clearFilterAsync("State");
  salesBySegment.clearFilterAsync("State");
});

undoButton.addEventListener("click", function unDo() {
  viz.undoAsync();
});

const filterRangeButton = document.getElementById("filter_range");

//Adding range filters for map - doesn't make sense to do this for the other charts.
filterRangeButton.addEventListener("click", function filterRangeFunction() {
  //Bringing in min and max values specified in our number inputs on the HTML page.
  // Have to convert these to floats to keep Tableau API happy
  const minValue = parseFloat(document.getElementById("minValue").value);
  const maxValue = parseFloat(document.getElementById("maxValue").value);
  console.log(minValue, maxValue);
  saleMap.applyRangeFilterAsync("SUM(Sales)", {
    min: minValue,
    max: maxValue,
  });
});
