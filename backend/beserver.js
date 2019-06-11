var express = require('express')
var bodyParser = require('body-parser');
var request = require('request')
var session = require('express-session')
var TopGit = require('../topGit').TopGit
var app = express()
app.use(bodyParser.json());
app.set('trust proxy', 1) // trust first proxy

app.get('/ranktopics', (req, res, next) => {
    TopGit = new TopGit
    TopGit.getTopics((topics) => {
        try{
            if (topics.success) {
                var parseTopic = JSON.parse(topics.response)
                parseTopic.names.forEach(topic => {
                    TopGit.rankTopics(topic,data=>{
                        console.log(data)
                        if (data != null)
                        topic = data.response.topic
                        rank  = data.response.rank
                        repo  = data.response.name
                        power = data.response.power
                        color = data.response.color
                        if (topic != null){
                            rankdata = {
                                'topic' : topic,
                                'rank' : rank,
                                'repository' : repo,
                                'power' : power,
                                'color' : color
                            }
                            res.json({
                                success: true,
                                rankdata: rankdata
                            })
                        }
                    })
                })
            }else{
                res.json({
                    success: false,
                    message: data.response
                })
            }
        }catch (e){
            console.log(e)
            res.json({
                success: false,
                message: "Something went wrong!"
            })
        }
    })
})
app.listen(3005, () =>
    console.log("Web app running at 3005")
)