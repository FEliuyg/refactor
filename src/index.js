const invoices = require("./invoices.json");
const plays = require("./plays.json");

function statement(invoice, plays) {
  let totalAmount = 0;
  let volumnCredits = 0;
  let result = `Statement for ${invoice.customer}\n`;

  for (let perf of invoice.performances) {
    const play = plays[perf.playId];
    let thisAmount = 0;

    switch (play.type) {
      case "tragedy":
        thisAmount = 40000;
        if (perf.audience > 30) {
          thisAmount += 1000 * (perf.audience - 30);
        }
        break;
      case "comedy":
        thisAmount = 30000;
        if (perf.audience > 20) {
          thisAmount += 10000 + 500 * (perf.audience - 20);
        }
        thisAmount += 300 * perf.audience;
        break;
      default:
        throw new Error(`unknown type: ${play.type}`);
    }

    volumnCredits += Math.max(perf.audience - 30, 0);
    if ("comedy" === play.type) {
      volumnCredits += Math.floor(perf.audience / 5);
    }

    result += `${play.name}: ${(thisAmount / 100).toFixed(2)} (${
      perf.audience
    } seats) \n`;
    totalAmount += thisAmount;
  }

  result += `Amount owed is ${(totalAmount / 100).toFixed(2)} \n`;
  result += `You earned ${volumnCredits} credits \n`;

  return result;
}

invoices.forEach((invoice) => console.log(statement(invoice, plays)));
