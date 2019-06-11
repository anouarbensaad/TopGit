var requester = require('./common/requester').requester
requester = new requester
exports.TopGit = TopGit
function TopGit(){
    const self = {}
// request function api github.
self.getTopics = function(callback){
    endpoint = '/repos/anouarbensaad/vulnx/topics'
    return requester.sendRequest(endpoint,(topics) => {
        callback({
            success : true,
            response: topics
        })
})// end of sendRequest followings ..
}
self.rankTopics = function (topic,callback){
    return requester.sendRequest2(topic,(data)=>{
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
                                callback({
                                    success : true,
                                    response: repoJSON
                                })
                            }// end condition good rank
                            else if ((i > 3) && (i < 9)){
                                repoJSON['power'] = power.normal
                                repoJSON['color'] = color.normal
                                callback({
                                    success : true,
                                    response: repoJSON
                                })
                            }// end condition normal rank
                            else if (i > 10){
                                repoJSON['power'] = power.bad
                                repoJSON['color'] = color.bad
                                callback({
                                    success : true,
                                    response: repoJSON
                                })
                            }// end condition bad rank
                        }// end condition matching true
                    }// end condition name != undefined
                })// endloop
            }//end condition if data not null
        }catch (err){
            callback({
                success : false,
                response: null
            })
        }                           
    })// end sendrequest.
}// end function ranktopic

//let topicFind = document.getElementsByClassName("overall-summary overall-summary-bottomless");

//    for (suggestTopic of topicFind){
//        suggestTopic.style['background-color'] = '#FF0FF';
//    }
//    chrome.runtime.onMessage.addListener(getTopics)
return self
}

