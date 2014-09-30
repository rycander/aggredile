Aggredile.Views.EntryShow = Backbone.View.extend({
  showTemplate: JST['entries/show'],
  titleTemplate: JST['entries/title'],
  tagName: 'li',
  className: 'entry',
  active: false,

  events: {
    'click .toggle-on': 'activate',
    'click .toggle-off': 'deactivate'
  },

  id: function() {
    return this.model.id;
  },

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  deactivate: function (event) {
    this.active = false;
    this.render();
  },

  activate: function(event) {
    this.trigger('activate', this);
    this.active = true;
    console.log(this.model.id);
    this.model.visit();
    this.render();
  },

  render: function () {
    var feed = Aggredile.Collections.feeds.get(this.model.get('feed_id'));
    if (this.active) {
      this.$el.html(this.showTemplate({
                entry: this.model,
        title: feed.escape('title')

      }));
    } else {
      this.$el.html(this.titleTemplate({
        entry: this.model,
        title: feed.escape('title')
      }));
    }
    return this;
  }
});
