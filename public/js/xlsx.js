var xlsxForm = document.getElementById("xlsx-upload-form");
// XLSX: Table row on-click event
function addXLSXLinkFn(event) {
  var gggg, hhhh;
  gggg = event.target.innerHTML.toString();
  if (/^[a-zA-Z]/.test(gggg)) {
    hhhh = "https://icuracao.com/searchanise/result?q=" + gggg.replace(/[^a-zA-Z0-9 ]/g, '').trim().replace(/\s+/g, '+').toLowerCase();
  } else {
    hhhh = "https://icuracao.com/catalog/product/view/id/" + gggg.replace(/[^0-9]/g, '').replace(/\s+/g, '');
  }
  var x = Math.floor(100000000 + Math.random() * 900000000);
  var addFormSku, addFormSkuVal;
  addFormSku = x;
  addFormSkuVal = x;
  var addFormPgNum = document.getElementById("addFormPgNum");
  var addFormLink = hhhh;
  var addFormPgNumVal = addFormPgNum.value.toString().trim().replace(/[^a-zA-Z0-9]/g, "");
  var addFormLinkVal = addFormLink.trim();
  var pageNumberToAddLink = document.getElementById("page_1");
  var pageNumberToAddLinkCol = pageNumberToAddLink.firstElementChild;
  var linkBeingAdded = document.createElement("div");
  linkBeingAdded.innerHTML = '<div id="' + addFormSkuVal + '" href="' + addFormLinkVal + '" ' + 'target="_blank" class="moveThis curacao-link link_overlay position-abs page-number-' + addFormPgNumVal + '" style="top: 30px; left: 30px; height: 140px; width: 140px;">' + '<div id="' + addFormSkuVal + 'header" class="linkyDrag py-2 fw-bold">' + "<u>HERE</u> TO MOVE<hr class='mx-0 my-1' /><u>BOTTOM RIGHT</u><br/>TO RESIZE<br/>" + "<hr class='mx-0 my-1' /><a target='_blank' href='" + addFormLinkVal + "'>" + addFormLinkVal + "</a>" + "</div></div>";
  pageNumberToAddLinkCol.appendChild(linkBeingAdded);
  addFormLink.value = "";
}
// XLSX: Add on-click event to table rows
function attachXLSXLinkFn(event) {
  var trs = document.querySelectorAll("#xlsx-output-html tr");
  var outputHtmlTable = document.querySelector("#xlsx-output-html table");
  if (trs && trs.length !== 0) {
    for (var i = 0; i < trs.length; i++) {
      trs[i].addEventListener("click", function (event) {
        addXLSXLinkFn(event);
      });
    }
  }
  if (outputHtmlTable && outputHtmlTable.length !== 0) {
    outputHtmlTable.classList = "table table-bordered table-striped d-block";
  }
}
// XLSX: Enable/disable the submit button
function enableXLSXSubmitButton() {
  const fileInput = document.getElementById("xlsx-file");
  const submitButton = document.getElementById("xlsx-submit-button");
  const xlsxClearButton = document.getElementById("xlsx-clear-button");
  const xlsxSubmitButton = document.getElementById("xlsx-submit-button");

  if (fileInput.files.length > 0) {
    submitButton.removeAttribute("disabled");
    xlsxClearButton.removeAttribute("style");
    xlsxSubmitButton.classList = "btn btn-primary btn-sm";
  } else {
    submitButton.setAttribute("disabled", "disabled");
    xlsxClearButton.setAttribute("style", "display: none;");
    xlsxSubmitButton.classList = "btn btn-primary btn-sm w-100";
  }
}
function clearXLSXFileAndOutput() {
  const fileInput = document.getElementById("xlsx-file");
  const outputHtml = document.getElementById("xlsx-output-html");

  // Clear the file input
  fileInput.value = null;

  // Clear the output HTML
  outputHtml.innerHTML = '';

  // Disable the submit button
  const submitButton = document.getElementById("xlsx-submit-button");
  submitButton.setAttribute("disabled", "disabled");

  const xlsxClearButton = document.getElementById("xlsx-clear-button");
  const xlsxSubmitButton = document.getElementById("xlsx-submit-button");
  if (fileInput.files.length > 0) {
    submitButton.removeAttribute("disabled");
    xlsxClearButton.removeAttribute("style");
    xlsxSubmitButton.classList = "btn btn-primary btn-sm";
  } else {
    submitButton.setAttribute("disabled", "disabled");
    xlsxClearButton.setAttribute("style", "display: none;");
    xlsxSubmitButton.classList = "btn btn-primary btn-sm w-100";
  }
}
// XLSX: Submit the form
function submitXLSXForm(event) {
  event.preventDefault();

  const fileInput = document.getElementById("xlsx-file");
  const outputHtml = document.getElementById("xlsx-output-html");

  if (fileInput.files.length === 0) {
    return;
  }

  const file = fileInput.files[0];

  // Use SheetJS to parse the XLSX file
  const reader = new FileReader();
  reader.onload = function (e) {
    const data = e.target.result;
    const workbook = XLSX.read(data, { type: "binary" });

    // Assuming you want to display the first sheet of the XLSX file
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    // Convert the sheet data to HTML
    const html = XLSX.utils.sheet_to_html(sheet);

    // Display the HTML
    outputHtml.innerHTML = html;

    // Enable the submit button
    const submitButton = document.getElementById("xlsx-submit-button");
    submitButton.removeAttribute("disabled");
  };

  reader.readAsBinaryString(file);
  setTimeout(function () {
    attachXLSXLinkFn(event);
  }, 500);
}