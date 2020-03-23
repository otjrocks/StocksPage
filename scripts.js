function buttonClick() {
  console.log("sending request");
  symbol = document.getElementById("searchText").value;
  var url = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + symbol + "&apikey=1OWJ182H5W88U14Y";
  request.open('GET', url, true);
  request.send();

}
function handleClick(bt) {
  console.log(bt.checked);
  if (bt.checked) {
    const a = document.createElement('a');
    a.innerHTML = "<a href='#' id='" + bt.value + "' class='list-group-item list-group-item-action bg-light' onClick='watchlistClick(this)'>" + bt.value + "</a>";
    info.appendChild(a);

  } else {
    // removes from watchList
    document.querySelectorAll('#'+ bt.value).forEach(e => e.parentNode.removeChild(e));
  }
}
function watchlistClick(buttonSymbol) {
  console.log("sending request");
  var tic = buttonSymbol.textContent;
  var url = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + tic + "&apikey=1OWJ182H5W88U14Y";
  request.open('GET', url, true);
  request.send();
}
function clearList() {
  document.getElementById("watchlist").innerHTML = "";
}

function moreCharts(bt) {
  console.log("inserting charts");
  var symbol = bt.value;
  document.getElementById('charts' + symbol).innerHTML = "<iframe style='border:none;' width='100%' height='600px' src='chart.html#" + symbol + "'></iframe>";


}

const container = document.createElement('div');
container.setAttribute('class', 'container-fluid');
container.setAttribute('id', 'cardContainer');
const app = document.getElementById('root');
app.appendChild(container);

const watchlist = document.getElementById('watchlist');
const info = document.createElement('div');
watchlist.appendChild(info);

var request = new XMLHttpRequest();
var symbol = "";
var count = 0;


request.onload = function () {

  // Begin accessing JSON data here
  var data = JSON.parse(this.response);
  if (request.status >= 200 && request.status < 400) {
    // create new card with <div>
    const card = document.createElement('div');
    card.setAttribute('class', 'card');
    const h1 = document.createElement('h1');
    const p = document.createElement('p');
    const chartsP = document.createElement('p');

    if (data["Error Message"] == "Invalid API call. Please retry or visit the documentation (https://www.alphavantage.co/documentation/) for GLOBAL_QUOTE.") {
      h1.innerHTML = "Error";
      p.innerHTML = "<code>Invalid Symbol</code>";
      console.log("invalid symbol");
      count++;
    } else {
    if (data.Note == "Thank you for using Alpha Vantage! Our standard API call frequency is 5 calls per minute and 500 calls per day. Please visit https://www.alphavantage.co/premium/ if you would like to target a higher API call frequency.") {
      h1.innerHTML = "Error";
      p.innerHTML = "<code>You have reached the max API calls allowed. Please wait one minute</code>";
      count++;
    } else {
    chartsP.setAttribute('id', 'charts' + data["Global Quote"]["01. symbol"]);


    h1.innerHTML = data["Global Quote"]["01. symbol"];
    p.innerHTML = "<div class='row'><div class='col-sm'>" + "Price: $" + data["Global Quote"]["05. price"] + "<br>Open: $" + data["Global Quote"]["02. open"] + "<br>High: $" + data["Global Quote"]["03. high"] + "<br>Low: $" + data["Global Quote"]["04. low"] + "<br>Change: " + data["Global Quote"]["10. change percent"]
    + "</div><div class='col-sm'><br><label style='padding:0px;' class='form-check checkbox'><input type='checkbox' value='" + data["Global Quote"]["01. symbol"] + "' onclick='handleClick(this);'> Add to Watchlist</label>"
+
"<button type='button' class='btn btn-outline-primary btn-sm' value='" + data["Global Quote"]["01. symbol"] + "' onClick='moreCharts(this)'>Charts...</button></div></div>";
    count++;
  }
}
    // puts newest card to top of stack
    if (count < 1) {
      container.appendChild(card); // first card is added
    } else {
      $('#cardContainer').prepend(card); // put further additions before it
    }

    card.appendChild(h1);
    card.appendChild(p);
    card.appendChild(chartsP);

  } else {
    // handle error problems if the api does not connect.
  }
}
