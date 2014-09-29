Aggredile.Views.EntriesIndex = Backbone.CompositeView.extend({
  template: JST['entries/index'],

  events:  {
    "click li": "toggleExpand",
  },

  initialize: function () {
    this.listenTo(this.collection, 'add', this.addEntry);
    this.listenTo(this.collection, 'sync', this.render);    
  },

  addEntry: function (model) {
    var showView = new Aggredile.Views.EntryShow({model: model});
    this.addSubview('ul.entry-holder', showView);
  },

  toggleExpand: function (event) {
    var $eventTarget = $(event.currentTarget);
    if (!$(event.target).hasClass('expanded-info')){
      $('li').removeClass('active');
    }
    if ($(event.target).hasClass('header')){
      $eventTarget.addClass('active');
    }
  },

  render: function () {
    var renderedContent = this.template({});

    this.$el.html(renderedContent);
    this.attachSubviews();
    return this;
  }

});
