Aggredile.Views.EntriesIndex = Backbone.CompositeView.extend({
  template: JST['entries/index'],

  events:  {
    // "click li": "toggleExpand",
    "submit form": "newFeed"
  },

  initialize: function (options) {
    this.collection = options.collection;
    this.feeds = options.feeds;
    this.listenTo(this.collection, 'add', this.addEntry);
    this.listenTo(this.collection, 'sync', this.render);
    this.listenTo(this.feeds, 'sync', this.render);
  },

  addEntry: function (model) {
    var showView = new Aggredile.Views.EntryShow({model: model});
    this.addSubview('ul.entry-holder', showView);
    this.listenTo(showView, 'activate', this.toggleExpand);
  },

  newFeed: function (event) {
    event.preventDefault();
    var url = $('#new-feed-url').val();
    $('#new-feed-url').val('');
    
  },

  toggleExpand: function (newEntry) {
    // var $eventTarget = $(event.currentTarget);
    // if (!$(event.target).hasClass('expanded-info')){
    //   $('li').removeClass('active');
    // }
    // if ($(event.target).hasClass('header')){
    //   $eventTarget.addClass('active');
    // }
    if (this.activeEntry) {
      this.activeEntry.active = false;
      this.activeEntry.render();
    }
    this.activeEntry = newEntry;
    this.activeEntry.render();
    window.scrollTo(0, this.activeEntry.$el.offset().top);
  },

  render: function () {
    var renderedContent = this.template({});

    this.$el.html(renderedContent);
    this.attachSubviews();
    return this;
  }

});
