Aggredile.Views.EntryShow = Backbone.View.extend({
  showTemplate: JST['entries/show'],
  titleTemplate: JST['entries/title'],
  tagName: 'li',
  className: 'entry',
  active: false,

  id: function() {
    return this.model.id;
  },

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
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
