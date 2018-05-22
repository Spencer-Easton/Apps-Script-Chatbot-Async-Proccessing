function onMessage(event) {
  var catagories = ['NONE','LANDSCAPES','RECEIPTS','CITYSCAPES','LANDMARKS','SELFIES','PEOPLE','PETS','WEDDINGS','BIRTHDAYS','DOCUMENTS','TRAVEL','ANIMALS','FOOD','SPORT','NIGHT','PERFORMANCES','WHITEBOARDS','SCREENSHOTS','UTILITY'];
  var helpWords = ['help','options','catagories'];
  var name = "";
  
  if (event.space.type == "DM") {
    name = "You";
  } else {
    name = event.user.displayName;    
  }
  
  if(event.message.text.indexOf("/showPhoto") != -1){   
   
   var options = event.message.text.split(' ');
   
   if( helpWords.indexOf(options[1].toLowerCase()) != -1){
     return {text:"usage: /showPhoto \n" + catagories.join('|')}
   }
   
   PubSubApp.setTokenService(tokenService());
   var pub = PubSubApp.PublishingApp(PubSubSettings.projectId);
   var message = pub.newMessage();
   event["userToken"] = ScriptApp.getOAuthToken();   
   message.data =  Utilities.base64Encode(JSON.stringify(event));
   pub.getTopic(PubSubSettings.topic).publish(message);   
      
    return {text:"Searching. One Sec."}  
  }
  return {text:"The bot ignores "+ name};  
}


function onCardClick(e){
   
}


/**
* Responds to an ADDED_TO_SPACE event in Hangouts Chat.
*
* @param {Object} event the event object from Hangouts Chat
*/
function onAddToSpace(event) {
  var message = "";
  
  if (event.space.type == "DM") {
    message = "Thank you for adding me to a DM, " + event.user.displayName + "!";
  } else {
    message = "Thank you for adding me to " + event.space.displayName;
  }
  
  return { "text": message };
}

/**
* Responds to a REMOVED_FROM_SPACE event in Hangouts Chat.
*
* @param {Object} event the event object from Hangouts Chat
*/
function onRemoveFromSpace(event) {
  console.info("Bot removed from ", event.space.name);
}


