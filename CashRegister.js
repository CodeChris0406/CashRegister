function checkCashRegister(price, cash, cid) {
    var changeDue = cash - price;
    var totalCid = cid.reduce((acc, curr) => acc + curr[1], 0).toFixed(2);
  
    if (Number(totalCid) < changeDue) {
        return { status: "INSUFFICIENT_FUNDS", change: [] };
    } else if (Number(totalCid) == changeDue) {
        return { status: "CLOSED", change: cid };
    } else {
        var change = [];
        var currencyValues = {
            "ONE HUNDRED": 100,
            "TWENTY": 20,
            "TEN": 10,
            "FIVE": 5,
            "ONE": 1,
            "QUARTER": 0.25,
            "DIME": 0.1,
            "NICKEL": 0.05,
            "PENNY": 0.01
        };
  
        for (var i = cid.length - 1; i >= 0; i--) {
            var currencyName = cid[i][0];
            var currencyTotal = cid[i][1];
            var currencyValue = currencyValues[currencyName];
            var currencyAmount = 0;
  
            while (changeDue >= currencyValue && currencyTotal >= currencyValue) {
                changeDue -= currencyValue;
                changeDue = changeDue.toFixed(2);
                currencyTotal -= currencyValue;
                currencyAmount += currencyValue;
            }
  
            if (currencyAmount > 0) {
                change.push([currencyName, currencyAmount]);
            }
        }
  
        if (changeDue > 0) {
            return { status: "INSUFFICIENT_FUNDS", change: [] };
        }
  
        return { status: "OPEN", change: change };
    }
}

checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);
