Aggredile.Views.EntryShow = Backbone.View.extend({
  showTemplate: JST['entries/show'],
  titleTemplate: JST['entries/title'],
  tagName: 'li',
  className: 'entry',
  active: false,

  events: {
    // 'click .toggle-on': 'activate',
    // 'click .toggle-off': 'deactivate',
    'click .feed-link': 'visitFeed',
    'click .toggle-root': 'toggleActive'
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

  toggleActive: function (event) {
    $clicked = $(event.target);
    if ( $clicked.hasClass('togglable')) {
      if (this.active) {
        this.deactivate();
      } else {
        this.activate();
      }
    }
  },

  visitFeed: function (event) {
    Backbone.history.navigate('feed/' + this.model.get('feed_id'), {trigger: true});
  },

  render: function () {
    var d = new Date(this.model.get('published_at'));
    var weekday = new Array(7);
    weekday[0]=  "Sun";
    weekday[1] = "Mon";
    weekday[2] = "Tue";
    weekday[3] = "Wed";
    weekday[4] = "Thu";
    weekday[5] = "Fri";
    weekday[6] = "Sat";

    var day = weekday[d.getDay()];
    var dateStr = day + " " + d.toLocaleDateString() + " " + d.toLocaleTimeString();

    if (this.active) {
      this.$el.html(this.showTemplate({
        entry: this.model,
        date: dateStr
      }));
    } else {
      this.$el.html(this.titleTemplate({
        entry: this.model,
        date: dateStr
      }));
    }
    return this;
  }
});
