Aggredile.Views.AllEntries = Backbone.View.extend({
  template: JST['feeds/index'],
  classname:'reader col-md-6',

  initialize: function () {
    this.listenTo(this.collection, 'sync', this.render);
  },

  render: function () {
    if(this.collection.length > 0) {
      this.$el.html(this.template({
        feeds: this.collection
      }));
    }
    return this;
  }
});
