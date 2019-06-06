// request lib.
var request = require('request')

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

// request function api github.
function sendRequest(endpoint,callback){
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
function sendRequest2(endpoint,callback){
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
function getTopics(gtCallback){
    endpoint = '/repos/anouarbensaad/vulnx/topics'
    return sendRequest(endpoint,(topics) => {
        gtCallback(topics)
})// end of sendRequest followings ..
}

function rankTopics(topic){
    return sendRequest2(topic,(data)=>{
        try {
            if (data != null){
                // regular expression for topic && matching group for topicname.
                var topic = /<title>Topic: ([^\s]+\s?)/;
                // regular expression for user & repository name.
                var repository = /<span class="text-normal">[^\s]+\s? \/<\/span> \w+/g;
                // match topic.
                var topic_match=data.match(topic);
                // match repository name.
                var repository_match = data.match(repository)
                // init rank
                let i=1
                // power ranking.
                power = {
                    good   :  '\x1b[92mGOOD\x1b[0m',
                    normal :  '\x1b[93mNORMAL\x1b[0m',
                    bad    :  '\x1b[91mBAD\x1b[0m'}

                // init color.
                var color = {
                    'good'  : 'green',
                    'normal': 'yellow',
                    'bad'   : 'red'}
                // loop to counting repo rank
                repository_match.forEach(repositoryranks=>{
                    // return ranking to a json object.
                    repoJSON = {
                        'topic': topic_match[1],
                        'rank' : i,
                        'name' : repositoryranks,
                    }
                    // count rank
                    i=i+1
                    var repoSearch = /(vulnx)/
                    if (repoJSON.name != undefined){
                        // if matching repository write the ranking.
                        if ((repoJSON.name).match(repoSearch)){
                            if (i < 3){
                                repoJSON['power'] = power.good
                                repoJSON['color'] = color.good
                            }// end condition good rank
                            else if ((i > 3) && (i < 9)){
                                repoJSON['power'] = power.normal
                                repoJSON['color'] = color.normal
                            }// end condition normal rank
                            else if (i > 10){
                                repoJSON['power'] = power.bad
                                repoJSON['color'] = color.bad
                            }// end condition bad rank
                            console.log('----------------------------------\nTOPIC : '
                            +repoJSON.topic 
                            + '\nRANK  : '+repoJSON.rank+'\nPOWER: '+repoJSON.power+'\nCOLOR: '+repoJSON.color
                            +'\n----------------------------------')
                        }// end condition matching true
                    }// end condition name != undefined
                })// endloop
            }//end condition if data not null
        }catch (err){
            console.log('\x1b[91m%s\x1b[0m','Unknown error occured : '+err)
        }                           
    })// end sendrequest.
}// end function ranktopic

//let topicFind = document.getElementsByClassName("overall-summary overall-summary-bottomless");

//    for (suggestTopic of topicFind){
//        suggestTopic.style['background-color'] = '#FF0FF';
//    }
//    chrome.runtime.onMessage.addListener(getTopics)

getTopics((topics) => {
    var parseTopic = JSON.parse(topics)
    parseTopic.names.forEach(topic => {
        rankTopics(topic)
    })
})