'use strict';

const domain = ["บริบท", "สิ่งพิมพ์", "วิทยุ", "ภาพยนตร์", "โทรทัศน์", "ออนไลน์"];
const range = ["#fddfdf", "#EFEFEF", "#fcf7de", "#defde0", "#def3fd", "#f0defd"];
const scale = d3.scaleOrdinal()
  .domain(domain)
  .range(range);
const legend = d3.legendColor()
  // .shape("path", d3.symbol().type(d3.symbolSquare).size(2000)())
  .shapePadding(5)
  .labelWrap(50)
  .shapeWidth(50)
  .orient("horizontal")
  .scale(scale);
d3.select(".legend")
  .call(legend);

  d3.csv("datapi-1.csv", function(error, data) {
    var list = document.getElementsByTagName("ul")[0];
  
    // Get column headers from the CSV file
    var columnHeaders = Object.keys(data[0]);
  
    // Create label elements for column headers
    var labelHtml = "";
    for (var i = 0; i < columnHeaders.length; i++) {
      if (columnHeaders[i] !== "Period" && columnHeaders[i] !== "story" && columnHeaders[i] !== "trasportation" && columnHeaders[i] !== "culture" && columnHeaders[i] !== "image") {
        labelHtml += "<div class='label'>" + columnHeaders[i] + "</div>";
      }
    }
    // Insert label elements into the timeline
    list.insertAdjacentHTML("afterbegin", labelHtml);
  
// Generate HTML for each data entry
for(var i = 0; i < data.length; i++) {
  // Check if any of the text data columns have content
  if (data[i].story || data[i].trasportation || data[i].culture) { // Add this line as the condition
    var item = document.createElement("li");
    var htmlString = "<div>";
    htmlString += "<div class='time'>พ.ศ." + data[i].Period + "</div>";
    htmlString += "<div class='story'> บริบท 🏠 | " + data[i].story + "</div>"; // Main story
    htmlString += "<div class='transportation'> ขนส่ง 🚌 | " + data[i].trasportation + "</div>"; // Transportation data
    htmlString += "<div class='culture'> วัฒนธรรม 🎷 | " + data[i].culture + "</div>"; // Culture data
    if (data[i].image) { htmlString += "<div class='image-wrapper'><img src='images/" + data[i].image + "' /></div>"; }
    htmlString += "</div>";
    item.innerHTML = htmlString;

    list.insertAdjacentElement("beforeend", item);
  }
}

    var items = document.querySelectorAll(".timeline li");
  
    // check if an element is in viewport
    function isElementInViewport(el) {
      var rect = el.getBoundingClientRect();
      return (rect.bottom - 100 > 0 && rect.top + 100 < (window.innerHeight || document.documentElement.clientHeight));
    }
  
    function callbackFunction() {
      for (var i = 0; i < items.length; i++) {
        if (isElementInViewport(items[i])) {
          items[i].classList.add("in-view");
        }
      }
    }
  
    window.addEventListener("load", callbackFunction);
    window.addEventListener("resize", callbackFunction);
    window.addEventListener("scroll", callbackFunction);
  });
  