
const util = require('util');
const Promise = require('promise');
const rp = require('request-promise');

var endpoint = 'https://app.gumble.tk/cgi/orzdb.cgi';


function get(query) {
    return new Promise(function (resolve, reject) {
        var options = {
            uri: endpoint,
            qs: { q: query },
            json: true
        };
        rp(options)
        .then(function (result) {
            if (result.ret == 200) {
                var row = [];
                var i = 0;
                for (i in result.rows) {
                    var col = {};
                    var j = 0;
                    for (j in result.description) {
                        col[result.description[j]] = result.rows[i][j];
                    }
                    row[i] = col;
                }
                resolve(row);
            } else {
                reject(result);
            }
        })
        .catch(function (e) {
            reject(e);
        });
    });
}

function getraw(query){
    return new Promise(function (resolve, reject) {
        var options = {
            uri: endpoint,
            qs: { q: query },
            json: true
        };
        rp(options)
        .then(function (result) {
            if (result.ret == 200) {
                resolve(result);
            } else {
                reject(result);
            }
        })
        .catch(function (e) {
            reject(e);
        });
    });
}

var interface = {
    get: get,
    getraw: getraw
};

module.exports = interface;