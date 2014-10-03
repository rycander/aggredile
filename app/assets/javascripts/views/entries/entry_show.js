Aggredile.Views.EntryShow = Backbone.View.extend({
  showTemplate: JST['entries/show'],
  titleTemplate: JST['entries/title'],
  tagName: 'li',
  className: 'entry',
  active: false,

  events: {
    'click .toggle-on': 'activate',
    'click .toggle-off': 'deactivate',
    'click .feed-link': 'visitFeed'
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
    this.model.visit();
    this.render();
  },

  visitFeed: function (event) {
    alert('clicked');
    Backbone.history.navigate('feed/' + this.model.get('feed_id'), {trigger: true});
  },

  render: function () {
    if (this.active) {
      this.$el.html(this.showTemplate({
        entry: this.model
      }));
    } else {
      this.$el.html(this.titleTemplate({
        entry: this.model
      }));
    }
    return this;
  }
});
