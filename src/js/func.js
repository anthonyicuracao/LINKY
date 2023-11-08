var pageNumberInput = document.getElementById("pageNumberInput");
var linkyJump = document.getElementById("linkyJump");

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function download(filename, text) {
    var element = document.createElement("a");
    element.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," + encodeURIComponent(text)
    );
    element.setAttribute("download", filename);

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

function startTime() {
    var moveThis = document.getElementsByClassName("moveThis");
    if (typeof moveThis !== "undefined" && moveThis !== null) {
        for (var i = 0; i < moveThis.length; i++) {
            dragElement(moveThis[i]);
        }
    }
}

setInterval(startTime, 1000);

function dragElement(elmnt) {
    var pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
        document.getElementById(elmnt.id + "header").onmouseup = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        elmnt.style.top = elmnt.offsetTop - pos2 + "px";
        elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

function letsGo(event) {

  //
    var inputUrl = document.getElementById("pageNumberInput").value;
    var matches, matchesType;
    if (inputUrl && inputUrl.indexOf(".png") !== -1) {
        matches = inputUrl.match(/(\d+)\.png$/);
        matchesType = ".png";
    } else {
        matches = inputUrl.match(/(\d+)\.jpg$/);
        matchesType = ".jpg";
    }
    if (matches && matches.length > 1) {
        var pageNumber = parseInt(matches[1]);
        var pageWithLeadingZeros = matches[1];
        var xasdfadfs = ("000000" + pageNumber).slice(-pageWithLeadingZeros.length);
    }
    //
    var urlBtn = document.getElementById("url");
    setTimeout(function() { urlBtn.click(); }, 500);
    setTimeout(function() { urlBtn.click(); }, 1000);
    setTimeout(function() { urlBtn.click(); }, 1500);
    setTimeout(function() { urlBtn.click(); }, 2000);
    setTimeout(function() { urlBtn.click(); }, 2500);

    var allLinks = document.getElementsByClassName("moveThis");
    var w = document.getElementById("page_1").offsetWidth / 100;
    var h = document.getElementById("page_1").offsetHeight / 100;
    for (var d = 0; d < allLinks.length; d++) {
        if (!allLinks[d].classList.contains("done")) {
            allLinks[d].style.height =
                (parseInt(allLinks[d].style.height.replace("px", "")) / h).toString() +
                "%";
            allLinks[d].style.top =
                (parseInt(allLinks[d].style.top.replace("px", "")) / h).toString() +
                "%";
            allLinks[d].style.width =
                (parseInt(allLinks[d].style.width.replace("px", "")) / w).toString() +
                "%";
            allLinks[d].style.left =
                (parseInt(allLinks[d].style.left.replace("px", "")) / w).toString() +
                "%";
            allLinks[d].classList.add("done");
        }
    }
    var catalogLinks = document.createElement("section");
    catalogLinks.setAttribute("style", "display:none;");
    catalogLinks.setAttribute("id", "catalog-links");
    var x = document.getElementsByClassName("moveThis");
    for (var i = 0; i < x.length; i++) {
        let a = document.createElement("a");
        // a.setAttribute("id", x[i].getAttribute("id"));
        a.setAttribute("href", x[i].getAttribute("href"));
        // a.setAttribute("target", x[i].getAttribute("target"));
        a.setAttribute("style", x[i].getAttribute("style"));
        a.classList = x[i].classList;
        a.classList.remove("done");
        a.classList.remove("moveThis");
        catalogLinks.append(a);
    }
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0");
    var yyyy = today.getFullYear();
 
    today = mm + "-" + dd + "-" + yyyy;
    var y =
    "Page " +  xasdfadfs +  " links " + 
        today.toString() +
        " v" +
        new Date().getTime().toString() +
        ".html";
    download(y, catalogLinks.innerHTML);
    if (catalogLinks) {
      if (catalogLinks.parentElement) {
        catalogLinks.parentElement.removeChild(catalogLinks);
      }
    }
    deleteAllFnNoPrompt(event);

  
}

var deleteMode = false;
var curacaoLinkArr = document.getElementsByClassName("curacao-link");
var linkyDelete = document.getElementById("linkyDelete");
var bodyTag = document.getElementsByTagName("body")[0];

function deleteModeFn(event) {
    event.preventDefault();
    if (deleteMode === false) {
        deleteMode = true;
        for (var p = 0; p < curacaoLinkArr.length; p++) {
            curacaoLinkArr[p].classList.add("deletable");
        }
        linkyDelete.classList =
            "btn btn-sm btn-danger my-2 w-100";
            linkyDelete.innerHTML = "Delete mode ON";
    } else {
        deleteMode = false;
        for (var pz = 0; pz < curacaoLinkArr.length; pz++) {
            curacaoLinkArr[pz].classList.remove("deletable");
        }
        linkyDelete.classList =
            "btn btn-sm btn-outline-warning my-2 w-100";
            linkyDelete.innerHTML = "Delete mode OFF";

    }
}

bodyTag.addEventListener("click", function (e) {
    var tgt = e.target;
    var deletable = "deletable";
    if (tgt.classList.contains(deletable)) {
        tgt.parentNode.removeChild(tgt);
    }
    
});

function updateAddFormFn() {
    var addFormPgNum = document.getElementById("addFormPgNum");
    var addFormLink = document.getElementById("addFormLink");
    addFormPgNum.setAttribute("value", addFormPgNum.value);
    addFormLink.setAttribute("value", addFormLink.value);
}

function addLinkFn(event) {
    event.preventDefault();
    var x = Math.floor(100000000 + Math.random() * 900000000);
    var addFormSku, addFormSkuVal;
    addFormSku = x;
    addFormSkuVal = x;
    var addFormPgNum = document.getElementById("addFormPgNum");
    var addFormLink = document.getElementById("addFormLink");
    var addFormPgNumVal = addFormPgNum.value
        .toString()
        .trim()
        .replace(/[^a-zA-Z0-9]/g, "");
    var addFormLinkVal = addFormLink.value.toString().trim();
    var pageNumberToAddLink = document.getElementById("page_1");
    var pageNumberToAddLinkCol = pageNumberToAddLink.firstElementChild;
    var linkBeingAdded = document.createElement("div");
    linkBeingAdded.innerHTML =
        '<div id="' +
        addFormSkuVal +
        '" href="' +
        addFormLinkVal +
        '" ' +
        'target="_blank" class="moveThis curacao-link link_overlay position-abs page-number-' +
        addFormPgNumVal +
        '" style="top: 30px; left: 30px; height: 140px; width: 140px;">' +
        '<div id="' +
        addFormSkuVal +
        'header" class="linkyDrag py-2 fw-bold">' +
        "<u>HERE</u> TO MOVE<hr class='mx-0 my-1' /><u>BOTTOM RIGHT</u><br/>TO RESIZE<br/>" +
        "<hr class='mx-0 my-1' /><a target='_blank' href='" + addFormLinkVal + "'>" + addFormLinkVal + "</a>" + "</div></div>";
    pageNumberToAddLinkCol.appendChild(linkBeingAdded);
    addFormLink.value = "";
document.getElementById("addFormLink").focus();

}

function setPageUrlFn() {
    var x = document.getElementById("pageNumberInput");
    var y = document.querySelectorAll("#page_1 img")[0];
    x.setAttribute("value", y.getAttribute("src"));
}

function updatePageUrlFn(event) {
    event.preventDefault();
    var x = document.getElementById("pageNumberInput");
    var y = document.querySelectorAll("#page_1 img")[0];
    y.setAttribute("src", x.value);
    // TEST
    // Get the input elements
    var pageNumberInput = document.getElementById("pageNumberInput");
    var addFormPgNum = document.getElementById("addFormPgNum");
    // Get the value of the pageNumberInput
    var inputUrl = pageNumberInput.value;
    // Use a regular expression to find the page number in the string
    var matches, matchesType;
    if (inputUrl && inputUrl.indexOf(".png") !== -1) {
        matches = inputUrl.match(/(\d+)\.png$/);
        matchesType = ".png";
    } else {
        matches = inputUrl.match(/(\d+)\.jpg$/);
        matchesType = ".jpg";
    }
    // console.log(matches);
    if (matches && matches.length > 1) {
        // Extract the page number
        var pageNumber = parseInt(matches[1]);
        // Update the addFormPgNum input without leading zeros
        addFormPgNum.value = pageNumber;
        // Format the new page number with the same number of leading zeros
        var pageWithLeadingZeros = matches[1];
        var updatedPageNumberInput = inputUrl.replace(matches[1] + matchesType, ("000000" + pageNumber).slice(-pageWithLeadingZeros.length) + matchesType);
        // Update the pageNumberInput with the new value
        pageNumberInput.value = updatedPageNumberInput;
    }
    //

    document.getElementById("addFormLink").focus();

}

function deleteAllFn(event) {
    event.preventDefault();
    var x = window.confirm("Are you sure you want to delete ALL links?");
    if (x) {
        var y = document.querySelectorAll(".px-0.col.position-relative > div");
        for (var i = 0; i < y.length; i++) {
            y[i].parentElement.removeChild(y[i]);
        }
    }
}

function deleteAllFnNoPrompt(event) {
    event.preventDefault();
        var y = document.querySelectorAll(".px-0.col.position-relative > div");
        for (var i = 0; i < y.length; i++) {
            y[i].parentElement.removeChild(y[i]);
        }
        updatePageNumber(event);
}

setPageUrlFn();


function updatePageNumber(event) {
    // Get the input elements
    var pageNumberInput = document.getElementById("pageNumberInput");
    var addFormPgNum = document.getElementById("addFormPgNum");
    // Get the value of the pageNumberInput
    var inputUrl = pageNumberInput.value;
    // Use a regular expression to find the page number in the string
    var matches, matchesType;
    if (inputUrl && inputUrl.indexOf(".png") !== -1) {
        matches = inputUrl.match(/(\d+)\.png$/);
        matchesType = ".png";
    } else {
        matches = inputUrl.match(/(\d+)\.jpg$/);
        matchesType = ".jpg";
    }
    if (matches && matches.length > 1) {
        // Extract the page number
        var pageNumber = parseInt(matches[1]);
        // Increment the page number
        pageNumber += 1;
        // Update the addFormPgNum input without leading zeros
        addFormPgNum.value = pageNumber;
        // Format the new page number with the same number of leading zeros
        var pageWithLeadingZeros = matches[1];
        var updatedPageNumberInput = inputUrl.replace(matches[1] + matchesType, ("000000" + pageNumber).slice(-pageWithLeadingZeros.length) + matchesType);
        // Update the pageNumberInput with the new value
        pageNumberInput.value = updatedPageNumberInput;
        // Run updatePageUrlFn
        updatePageUrlFn(event);
    }
document.getElementById("addFormLink").focus();

}

function updatePageNumber2(event) {
    // Get the input elements
    var pageNumberInput = document.getElementById("pageNumberInput");
    var addFormPgNum = document.getElementById("addFormPgNum");
    // Get the value of the pageNumberInput
    var inputUrl = pageNumberInput.value;
    // Use a regular expression to find the page number in the string
    var matches, matchesType;
    if (inputUrl && inputUrl.indexOf(".png") !== -1) {
        matches = inputUrl.match(/(\d+)\.png$/);
        matchesType = ".png";
    } else {
        matches = inputUrl.match(/(\d+)\.jpg$/);
        matchesType = ".jpg";
    }
    if (matches && matches.length > 1) {
        // Extract the page number
        var pageNumber = parseInt(matches[1]);
        // Increment the page number
        pageNumber = pageNumber - 1;
        // Update the addFormPgNum input without leading zeros
        addFormPgNum.value = pageNumber;
        // Format the new page number with the same number of leading zeros
        var pageWithLeadingZeros = matches[1];
        var updatedPageNumberInput = inputUrl.replace(matches[1] + matchesType, ("000000" + pageNumber).slice(-pageWithLeadingZeros.length) + matchesType);
        // Update the pageNumberInput with the new value
        pageNumberInput.value = updatedPageNumberInput;
        // Run updatePageUrlFn
        updatePageUrlFn(event);
    }
document.getElementById("addFormLink").focus();

}

document.getElementById("pageNumberInput").focus();