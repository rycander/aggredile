Aggredile.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
  },

  routes: {
    '': 'index',
    'feed/:id': 'feedshow'
  },

  index: function () {
    Aggredile.Collections.entries.fetch();
    var RouterIndex = new Aggredile.Views.EntriesIndex({
      collection: Aggredile.Collections.entries
    });
    this._swapView(RouterIndex);
  },

  feedshow: function (id) {
    var entries = new Aggredile.Collections.AllEntries([], {id: id});
    var feed = new Aggredile.Models.Feed({id: id});
    feed.fetch();
    entries.fetch();
    Aggredile.Collections.feeds.fetch();
    var FeedIndex = new Aggredile.Views.EntriesIndex({
      collection: entries,
      model: feed
    });
    this._swapView(FeedIndex);
  },

  _swapView: function (newView) {
    if (this.currentView) {
      this.currentView.remove();
    }

    this.$rootEl.html(newView.render().$el);
    newView.delegateEvents();
    this.currentView = newView;
  }
});
