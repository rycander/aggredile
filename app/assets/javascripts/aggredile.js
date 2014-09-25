window.Aggredile = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new Aggredile.Routers.Router({
      $rootEl: $('.reader')
    });
    console.log('hi')
    Backbone.history.start();
  }
};

$(document).ready(function(){
  Aggredile.initialize();
});
