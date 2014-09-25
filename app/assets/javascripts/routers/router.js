Aggredile.Routers.Router = Backbone.Router.extend({
  initialize: function () {

  },

  routes: {
    '': 'index'
  },

  index: function () {
    this.$rootEl = new RouterIndex ({
      this.Feeds = new Aggredile.Views.All
    });
  }
});
