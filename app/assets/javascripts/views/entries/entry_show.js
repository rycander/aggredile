Aggredile.Views.EntryShow = Backbone.CompositeView.extend({
  template: JST['entries/show'],
  classname:'li',

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
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
