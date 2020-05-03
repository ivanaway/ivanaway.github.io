$(document).ready(async function() {
    let BASE_URL = 'https://api.github.com/repos/ivanaway/ivanaway.github.io';
    let CREDS = await getFile('https://api.github.com/repos/zivan-1/zivan-1.github.io/contents/creds.txt');
    let labels = await getJsonFile(`${BASE_URL}/contents/labels.json`);
    // labels = {
    //     positives: ['5.png', '444.png', '23.png'...],
    //     negatives: ['0.png', '1492.png', '55.png'...]
    // }
    let imageIndex = await getJsonFile(`${BASE_URL}/contents/image-index.json`);
    // imageIndex = {
    //     allImages: ['0.png', '1.png', '3.png'...],
    //     allImagesByFolder: {
    //         1: ['0.png', '5555.png', '0091.png'...],
    //         2: ['9887.png'. '8827.png', '112.png'...],
    //         .
    //         .
    //         .
    //     }
    // }
    let imageElement = document.getElementById('image');
    let yesButton = document.getElementById('yes');
    let noButton = document.getElementById('no');

    updateImage(BASE_URL, labels, imageIndex, imageElement);

    yesButton.addEventListener('click', () => clickHandler(BASE_URL, labels, imageIndex, imageElement, true));
    noButton.addEventListener('click', () => clickHandler(BASE_URL, labels, imageIndex, imageElement, false));
});

async function GET(url) {
    let response = await fetch(url, {
        method: 'GET'
    });
    if (!response.ok) {
        return new Error(`Failed getting ${url} ${response.status}: ${response.statusText}`);
    } else {
        return await response.json();
    }
}

async function PUT(url, creds, body) {
    let response = await fetch(url, {
        method: 'PUT',
        headers: {Authorization: `Basic ${creds}`},
        body: body
    });
    if (!response.ok) {
        return new Error(`Failed getting ${url} ${response.status}: ${response.statusText}`);
    } else {
        return await response.json();
    }
}

async function getFile(url) {
    let fetchJson = await GET(url);
    if (fetchJson instanceof Error) {
        console.error(fetchJson);
    } else {
        return atob(fetchJson.content);
    }
}

async function getJsonFile(url) {
    let fetchJson = await GET(url);
    if (fetchJson instanceof Error) {
        console.error(fetchJson);
    } else {
        return JSON.parse(atob(fetchJson.content));
    }
}

async function upload(url, creds, content) {
    let uploadResponseJson = await PUT(url, creds, JSON.stringify({
        'message': `uploaded to ${url}`,
        'commiter': {
          'name': "Monalisa Octocat",
          'email': "octocat@github.com"
        },
        'content': content
    }));
}

function clickHandler(baseUrl, labels, imageIndex, imageElement, isImpact) {
    if (isImpact) {

    } else {

    }
    updateImage(baseUrl, labels, imageIndex, imageElement);
}

function updateImage(baseUrl, labels, imageIndex, imageElement) {
    let labeled = labels.positives.concat(labels.negatives);
    let unlabeled = antiIntersect(labeled, imageIndex.allImages);

    let newImageName = unlabeled[Math.floor(Math.random() * unlabeled.length)];
    // Find in which folder the image is
    let newImageDir;
    for (let folder in imageIndex.allImagesByFolder) {
        // Skip loop if the property is from object prototype
        if (!imageIndex.allImagesByFolder.hasOwnProperty(folder)) continue;
        if (imageIndex[folder].includes(newFileName)) newImageDir = folder;
    }
    let newImagePath = `images/${newImageDir}/${newImageName}`;

    GET(`${baseUrl}/contents/${newImagePath}`).then(response => {
        if (response instanceof Error) {
        console.error(response);
        } else {
            imageElement.setAttribute('src', response.downloadUrl);
        }
    });
}

function antiIntersect(arr1, arr2) {
    return arr1.filter(elem => !arr2.includes(elem));
}