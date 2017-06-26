var SteamUser = require('steam-user'); 
var http = require('http');
var fs=require('fs');

var client = new SteamUser();

client.logOn({
    "accountName": "",
    "password": ""
});


client.on('loggedOn', function(details) {
    console.log("Logged into Steam as " + client.steamID.getSteamID64());
});


client.on('webSession', function(sessionId, cookies) {
    
    web_id=sessionId;
    web_cookies=cookies;
    client.setOption("enablePicsCache", true);
});


var apps_to_download=0;
var downloaded_apps=0;
var downloading=0;

client.on('appOwnershipCached', function(){

    var owned_apps =client.getOwnedApps();
    apps_to_download=owned_apps.length
    console.log("Found "+apps_to_download+" Owned apps.");
    console.log("Downloading Headers");

    client.logOff();
    delete client;

    if (!fs.existsSync("headers")){
        fs.mkdirSync("headers");
    }

    if(downloading == 0){
        owned_apps.forEach(function(appid){
            download("http://cdn.akamai.steamstatic.com/steam/apps/"+appid+"/header.jpg", "headers/"+appid+".jpg", stop_when_done);
        });
        downloading=1;
    }

})

// https://stackoverflow.com/questions/11944932/how-to-download-a-file-with-node-js-without-using-third-party-libraries
function download(url, dest, cb) {
  var file = fs.createWriteStream(dest);
  var request = http.get(url, function(response) {
    response.pipe(file);
    file.on('finish', function() {
      
      if( file.bytesWritten < 200 ){
        fs.unlink(dest);
        if (cb){ 
            cb();
        }
        return;
      }
      file.close(cb);  // close() is async, call cb after close completes.

    });
  }).on('error', function(err) { // Handle errors
    fs.unlink(dest); // Delete the file async. (But we don't check the result)
    if (cb) cb(err.message);
  });
};


function stop_when_done(){
    downloaded_apps++;
    console.log(downloaded_apps+"/"+apps_to_download);

    if( downloaded_apps == apps_to_download){
        process.exit();
    }
}
