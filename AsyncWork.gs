
function getAPicture(OAuthToken,catagories){
var OAuthToken = OAuthToken || ScriptApp.getOAuthToken();
      
   var filters = {
  "filters": {
    "contentFilter": {
      "includedContentCategories": catagories
    }
  }
};
   
   Photoslibrary.setTokenService(function(){return OAuthToken});   
   var response = Photoslibrary.mediaItemsSearch(filters);
   var urls = response.map(function(photo){ return photo.baseUrl});   
   return urls[Math.floor(Math.random() * urls.length)];
}


function respondAPhoto(spaceName, imageUrl){
  var card = {
  "cards": [
    {
      "sections": [
        {
          "widgets": [
            {
              "image": {
                "imageUrl": imageUrl
              }
            }
          ]
        }
      ]
    }
  ]
}
  
  var ts = tokenService();
  Chat.setTokenService(ts);
  Chat.spacesMessagesCreate(spaceName,card);
}
