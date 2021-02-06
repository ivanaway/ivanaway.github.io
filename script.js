function stockSearchHandler(event) {
    let query = document.getElementById('newsSearch').nodeValue
    getNews(query).then(data => {
        
    })
}

fetch('https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=U65M3D2LOCIOUFEM', {
}).then(response => response.json()).then(data =>console.log(data))