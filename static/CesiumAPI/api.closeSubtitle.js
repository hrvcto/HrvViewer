define(function(){
  function closeSubtitle(cesiumWidget, options) {
    if(document.getElementById('showScriptDIV')) {
      document.body.removeChild(document.getElementById('showScriptDIV'));
    }
  }
  return closeSubtitle;
});