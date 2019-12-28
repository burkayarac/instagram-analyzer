var express=require("express")
var app=express()
var sleep = require('sleep');

app.get('/',function(req,res){
    
    const Instagram = require('instagram-web-api')
    const username='software.plus', password='123321xx'

    const client = new Instagram({ username, password })

    ;(async () => {
    await client.login()
    const profile = await client.getProfile()
    const instagram = await client.getUserByUsername({ username: 'burkay.arac' })
    var UserToFind = instagram['id'];
    var followersOfUser = [];
    var end_cursor;

    var max = instagram["edge_followed_by"]["count"]
    while(followersOfUser.length <= max){
        await client.getFollowers({ userId: UserToFind, first: 50, after: end_cursor }).then(followers => {
        followers.data.forEach(function(value){
          followersOfUser.push(value.username)
        })
        sleep.sleep(1)
        end_cursor = followers.page_info.end_cursor;
      })
    }
    try {
        var i=0
        while(i != followersOfUser.length) {
            await client.getUserByUsername({ username:followersOfUser[i] }).then(users => {
                var j=0
                if(users.edge_followed_by.count < 100) {
                    j++
                }
                if(users.edge_follow.count < 100) {
                    j++
                }
                if(users.edge_owner_to_timeline_media.count < 3) {
                    j++
                }
                if(users.full_name == "") {
                    j++
                }
                if(j > 3) {
                    console.log(users.username)
                }
            }).then(function(){
                i++
                console.log(i)
                if(i % 5 == 0)
                {
                    sleep.sleep(1)
                }
            })
            
        }
    }catch(e)
    {
        console.log(e)
    }
    })()
    
})
var server = app.listen(80, function() {
    console.log('Express server listening on port ' + server.address().port);
});
server.timeout = 10000000;
