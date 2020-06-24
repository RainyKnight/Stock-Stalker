function runCode() {
    alert("Hello World!");
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