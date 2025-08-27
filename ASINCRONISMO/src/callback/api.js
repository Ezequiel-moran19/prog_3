const { XMLHttpRequest } = require("xmlhttprequest");
const API = 'https://dragonball-api.com/api';

function fetchAPI(url, callback) {
    let req = new XMLHttpRequest();
    req.open('GET', url, true);
    req.onreadystatechange = function() {
        if (req.readyState === 4) {
            if (req.status === 200) {
                callback(null, JSON.parse(req.responseText));
            } else {
                const error = new Error(`URL inválida ${url}`);
                return callback(error, null);
            }
        }
    };
    req.send();
}

fetchAPI(`${API}/characters`, function(error1, data1) {
    if (error1) return console.error(error1);
    fetchAPI(`${API}/characters/${data1.items[1].id}`, function(error2, data2) {
        if (error2) return console.error(error2);
        fetchAPI(`${API}/planets/${data2.originPlanet.id}`, function(error3, data3) {
            if (error3) return console.error(error3);
            console.log(`Personaje: ${data2.name}`);
            console.log(`Planeta de origen: ${data3.name}`);
        });
    });
});
