const url = 'wss://ws-api.coincheck.com/';
const connection = new WebSocket(url);

let result;
let lastRate;

connection.onopen = function () {
  console.log('connection server');
  connection.send(JSON.stringify({type: "subscribe", channel: "btc_jpy-trades"}))
};

connection.onerror = function (error) {
  console.log(error);
};

connection.onmessage = function (res) {
  console.log(res.data);

  result = JSON.parse(res.data)[2];

  console.log(result);

  if (result === lastRate) {
    document.getElementById("dispChart").className = "";
  } else {
    document.getElementById("dispChart").className = result > lastRate ? "rate-up" : "rate-down";
  }

  document.getElementById('dispChart').innerHTML = result;

  lastRate = result;
}
