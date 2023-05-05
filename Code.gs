function onOpen(e) {
  DocumentApp.getUi().createAddonMenu()
      .addItem('Start', 'showSidebar')
      .addToUi();
  showSidebar()
}

function onInstall(e) {
  onOpen(e);
}

function showSidebar() {
  var ui = HtmlService.createHtmlOutputFromFile('Interface')
      .setTitle('Easy Highlighter')
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);
  DocumentApp.getUi().showSidebar(ui);
}

let trigger;

const highlighter = function(){
  DocumentApp.getUi().alert('Hello, world');
  let selection = DocumentApp.getActiveDocument().getSelection();
  if(selection){
    selection.getRangeElements().forEach(e => {
      let range = [e.getStartOffset(), e.getEndOffsetInclusive()];
      e.getElement().editAsText()
        .setBackgroundColor(...range, '#FFFF00')
    });
  } 
}

const highlight = function(){
  DocumentApp.getUi().alert('Hello, world2');
  trigger = ScriptApp.newTrigger('highlighter')
  .forDocument(DocumentApp.getActiveDocument())
  .timeBased()
  .everyMinutes(1)
  .create();
}