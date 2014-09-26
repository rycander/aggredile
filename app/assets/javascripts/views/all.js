Aggredile.Views.AllEntries = Backbone.View.extend({
  template: JST['feeds/index'],
  classname:'reader',

  initialize: function () {
    this.listenTo(this.collection, 'sync', this.render);
  },

  render: function () {
    if(this.collection.length > 0) {
      debugger;
      var entries = [];
      this.collection.each(function (feed) {
        array = array.concat(feed.get('entries')); }
      );
      this.$el.html(this.template({
        collection: array
      }));
    }
    return this;
  }
});
