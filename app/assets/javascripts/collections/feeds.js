Aggredile.Collections.Feeds = Backbone.Collection.extend({

  model: Aggredile.Models.Feed,
  url: 'api/feeds'
});
Aggredile.Collections.feeds = new Aggredile.Collections.Feeds();
