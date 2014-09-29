Aggredile.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
  },

  routes: {
    '': 'index'
  },

  index: function () {
    Aggredile.Collections.feeds.fetch();
    // Aggredile.Collections.entries.fetch();
    var RouterIndex = new Aggredile.Views.EntriesIndex({
      collection: Aggredile.Collections.entries,
      feeds: Aggredile.Collections.feeds
    });
    this.$rootEl.html(RouterIndex.render().$el);
  }
});
