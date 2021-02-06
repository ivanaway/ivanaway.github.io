function stockSearchHandler(event) {
    let query = document.getElementById('newsSearch').nodeValue
    getNews(query).then(data => {
        
    })
}

fetch('https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=U65M3D2LOCIOUFEM', {
}).then(response => response.json()).then(data =>console.log(data))

function getCrypto() {
    var requestUrl = 'https://api.coinbase.com/v2/exchange-rates';
    console.log(requestUrl);
    fetch(requestUrl)
      .then(function (response) {
        console.log(response)
        if (response.ok) {
          return response.json()
            .then(function (cryptoData) {
              if (cryptoData["Error Message"]) {
                return $('#errorModal').foundation('open')
              }
              console.log("crypto data: ", cryptoData)
              displayCrypto(cryptoData)
              return cryptoData
            })
  
        }
      })
  }
