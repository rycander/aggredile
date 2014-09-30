Aggredile.Views.EntriesIndex = Backbone.CompositeView.extend({
  template: JST['entries/index'],
  pageCount: 1,
  events:  {
    // "click li": "toggleExpand",
    "submit form.newfeed": "newFeed",
    "click .refresh": "refresh",
    "click .more": "addMore"
  },

  initialize: function (options) {
    this.collection = options.collection;
    this.feeds = options.feeds;
    this.listenTo(this.collection, 'add', this.addEntry);
    this.listenTo(this.collection, 'sync add', this.render);
    this.listenTo(this.feeds, 'sync', this.render);
  },

  addEntry: function (model) {
    var showView = new Aggredile.Views.EntryShow({model: model});
    this.prependSubview('ul.entry-holder', showView);
    this.listenTo(showView, 'activate', this.toggleExpand);
  },

  newFeed: function (event) {
    event.preventDefault();
    var url = $('#new-feed-url').val();
    $('#new-feed-url').val('');
    var feed = new Aggredile.Models.Feed({url: url});
    feed.save();
  },

  addMore: function () {
    this.pageCount += 1;
    this.collection.next();
  },

  refresh: function (){
    event.preventDefault();
    this.collection.fetch();
    this.feeds.fetch();
  },

  toggleExpand: function (newEntry) {
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
    console.log('rendered');
    this.$el.html(renderedContent);
    this.attachSubviews();
    return this;
  }

});
