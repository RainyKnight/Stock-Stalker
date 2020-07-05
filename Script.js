var tickerSymbolVal;
var stockXValues = [];
var stockYValues = [];
var stockTotal = 0;
var stockAverage = 0;
var currentPrice;
var potentialProfit;




function runCode() {
   stock();
}

function stock() {
   tickerSymbolVal = (document.getElementById("formTickerSymbol").value); //get user input
   fetchStock(tickerSymbolVal);

   // update the stock name with user input
   document.getElementById("tickerSymbol").innerHTML = tickerSymbolVal;
}

function fetchStock(symbol) {
   const API_KEY = "SYYW3CEFTKIL6G9Q";
   let API_CALL = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=" + symbol + "&interval=5min&apikey=" + API_KEY;


   fetch(API_CALL)
      .then(
         function (response) {
            return response.json();
         }
      )
      .then(
         function (data) {
            console.log(data);

            for (var key in data['Time Series (5min)']) {
               stockXValues.push(key);
               stockYValues.push(data['Time Series (5min)'][key]['4. close']);
            }

            currentPrice = stockYValues[0];
            // average stock price and record whether or not to buy stock 
            for (let i = 0; i < stockYValues.length; i++) {
               stockTotal += parseInt(stockYValues[i]);
            }

            // calculate average price per share
            stockAverage = stockTotal / 100;

            console.log("Last close price: $" + currentPrice);
            console.log("Average: $" + stockAverage);

            if (currentPrice < stockAverage) {
               potentialProfit = currentPrice / stockAverage;
               document.getElementById("stockPriceBelow").innerHTML = "Current: $" + currentPrice;
               document.getElementById("stockPriceBelow").style.color = "red";
               console.log("BUY for " + potentialProfit + "% potential profit");
            }
            else if (currentPrice > stockAverage) {
               potentialProfit = stockAverage / currentPrice;
               document.getElementById("stockPriceAbove").innerHTML = "Current: $" + currentPrice;
               document.getElementById("stockPriceAbove").style.color = "green";
               console.log("SELL for " + potentialProfit + "% potential profit");
            }
            else {
               console.log("HOLD!");
            }

            // had to move the price updater into here because the value couldn't be retrieved from other scopes
            document.getElementById("stockTime").innerHTML = "" + stockXValues[0];
            document.getElementById("stockAverage").innerHTML = "Average: $" + stockAverage;

         }
      )
}

/*
PSEUDOCODE PLANNING

Features wanted:

 + Track different stocks that the user sets.
 + Autoupdate every day, every hour.

 Scenarios:
    + Stock is rising, SELL (stock will fall)
    + Stock is falling, BUY (stock will rise)
    + Stock is STILL falling, SELL (stock is crashing)
    - (future implementation) Stock is STILL rising? (stock is soaring)
    - (future implementation) Stock had a LARGE spike/dip and is giving outlier numbers for range.

 + Track general highs and lows to generate statistics.
 + For now, just monitor stocks and pretend buy/sell.
 - (future implementation) Will implement actual buying and selling through API later.

 NOTE: This only profits off stock fluctuations, not general trend. If a stock soars and jumps 50% in a day,
       it will only profit as much as the set profitForecast. (possible future implementation scenario.)

   -------------------------------------------------------------------------------
// current stock price
var stock = whatever API can grab it;

// highest peak recently
var high = whatever API can grab it;

// lowest valley recently
var low = whatever API can grab it;

// current average stock price
var AVG = calculate average stock trend;

// fluctuation range
var range = high - low;

// predicted amount it will rise/fall from the AVG
var volitility = range / 2;

// A percentage of the fluctuation to act on (greater percentage = less consistent income/more $$)
// Currently set to 20%
var profitForecast = 0.2;

// strike price to secure profit at
var sellPrice = AVG + (volitility * profitForecast);
stock.sell();

// strike price to buy in at
var buyPrice = AVG - (volitility * profitForecast);
stock.buy();

// sell all shares because the stock is crashing
// only happens if the new average is less than the old average three consecutive times
if ((AVG < oldAVG) && (oldAvG < oldoldAVG) && (oldoldAVG < oldoldoldAVG))
stock.sell();

   -------------------------------------------------------------------------------

EXAMPLE:

TSLA stock general trend is going up.

var stock = API call;
// 1052

var high = API call;
// 1068

var low = API call;
// 983

var AVG = 1000;
// 1000

// fluctuation range
var range = high - low;
// 85

var volitility = range / 2;
// 42.5

// Currently set to 20%
var profitForecast = 0.2;

// strike price to secure profit at
var sellPrice = AVG + (volitility * profitForecast);
stock.sell();
// 1008.5


// strike price to buy in at
var buyPrice = AVG - (volitility * profitForecast);
stock.buy();
// 991.5

*/