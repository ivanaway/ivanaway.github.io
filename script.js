let newsApiKey = 'feef1da8cb7732bae46deb391e9d0f83' // lol

fetch('https://api.datanews.io/v1/news?q=SpaceX&from=2020-07-01&to=2020-09-10&language=en&apiKey=0aszfc72ctgxr4e947mg1sr67', {
    method: 'get',
    headers: {
        'Access-Control-Allow-Origin': '*'    
    }
}).then(response => response.json()).then(data =>console.log(data))
