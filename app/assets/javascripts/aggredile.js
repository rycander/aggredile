window.Aggredile = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new Aggredile.Routers.Router({
      $rootEl: $('.reader')
    });
    Backbone.history.start();
  }
};
