// request lib.
var request = require('request')
exports.requester = requester
function requester(){
const self = {}
// api github root
let API_URL = 'https://api.github.com'

// normal github root
let GIT_URL = 'https://github.com/topics/'

// header for api github url
let headers = {
    'Accept'              :     'application/vnd.github.mercy-preview+json',
    'Content-Type'        :     'application/json; charset=utf-8',   
    'X-GitHub-Media-Type' :     'github.v3',
    'Host'                :     'api.github.com',
    'Connection'          :     'keep-alive',
    'User-Agent'          :     'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3187.0 Safari/537.36',
}

// header for normal github url
let headers2 = {
    'Host'                :     'github.com',
    'Connection'          :     'Keep-Alive',
    'User-Agent'          :     'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3187.0 Safari/537.36',
    'Accept'              :     'application/*'
}

self.sendRequest = function (endpoint,callback){
    // get request
    request.get({
        // send headers.
        headers: headers,
        // api.github & endpoint worked in.
        url: API_URL + endpoint,
    // callback request.get
    },(err, response, data) => {
        // in case of error return NULL
        if (err)
            callback(null)
        else {
        // in case of success return data
            callback(data)}
    })
}

// request function for normal url github.
self.sendRequest2 = function(endpoint,callback){
    request.get({
        headers: headers2,
        url: GIT_URL + endpoint,
    },(err, response, body) => {
        if (err)
            callback(null)
        else {
            callback(body)}
    })
}
return self
}