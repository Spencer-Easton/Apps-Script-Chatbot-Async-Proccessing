function doPost(e) {
  
  var postBody = JSON.parse(e.postData.getDataAsString());  
  var messageData = Utilities.newBlob(Utilities.base64Decode(postBody.message.data)).getDataAsString();
  var event = JSON.parse(messageData);  
  //  console.log({messageData:messageData});  
  var userToken = event.userToken;
  var spaceName = event.space.name;
  var catagories = event.message.text.split(' ')[1].split('|');
  var url = getAPicture(userToken,catagories);
  respondAPhoto(spaceName, url);
  
  // A Hack! But it works to ack the push notification. 
  // Any Content or Html service response will result in a redirect which never tells the server you ack.  
  return 200; 
}
