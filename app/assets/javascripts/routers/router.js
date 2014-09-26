Aggredile.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
  },

  routes: {
    '': 'index'
  },

  index: function () {
    Aggredile.Collections.feeds.fetch();
    var RouterIndex = new Aggredile.Views.AllFeeds({
      collection: Aggredile.Collections.feeds
    });
    this.$rootEl.html(RouterIndex.render().$el);
  }
});
