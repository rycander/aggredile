Aggredile.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
  },

  routes: {
    '': 'index'
  },

  index: function () {
    Aggredile.Collections.entries.fetch();
    var RouterIndex = new Aggredile.Views.AllEntries({
      collection: Aggredile.Collections.entries
    });
    this.$rootEl.html(RouterIndex.render().$el);
  }
});
