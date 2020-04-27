const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const videos = require("./data")

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
})

server.get("/", function (req, res) {
    const data = {
        avatar_url: "https://media-exp1.licdn.com/dms/image/C5603AQEZy4C4cbde2Q/profile-displayphoto-shrink_200_200/0?e=1591833600&v=beta&t=pxatEe8ggGV3oUWCxSQIVLRTmRwrdyZgdpTrslgbRMU",
        name: "Jean Machado",
        role: "Developer Jr.",
        description: 'Student at <a href="https://rocketseat.com.br" target="_blank"> Rocketseat </a>',
        links: [
            { name: "GitHub", url: "https://github.com/jeannzk021"},
            { name: "Linkedin", url: "https://www.linkedin.com/in/jeanmachado021"},
            { name: "E-mail", url: "mailto:jeannzk021@gmail.com"},
            { name: "Instagram", url: "https://www.instagram.com/jeannzk021/"},
            { name: "Facebook", url: "https://www.facebook.com/profile.php?id=100001442848247"}
        ]
        
    }


    return res.render("about", { data })
})


server.get("/portfolio", function(req, res) {
    return res.render("portfolio", { items: videos })
})

server.get("/video", function(req, res) {
    const id = req.query.id

    const video = videos.find(function(video){
        return video.id == id 

    })

    if (!video) {
        return res.send("<h1>Video not found!</h1>")
    }

    return res.render("video", { item: video })
})

server.listen(5000, function() {
    console.log("server is running")
})