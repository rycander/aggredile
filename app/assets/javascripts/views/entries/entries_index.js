Aggredile.Views.EntriesIndex = Backbone.CompositeView.extend({
  template: JST['entries/index'],
  pageCount: 1,
  events:  {
    "submit form.newfeed": "newFeed",
    "click .refresh": "refresh",
    "click .more": "addMore",
    "click .home": "redirectToHome",
    "click .subscribe": "subscribe",
    "click .unsubscribe": "unsubscribe"
  },

  initialize: function (options) {
    this.remove();
    $('ul.entry-holder').empty();
    this.collection.reset();
    this.collection.fetch();

    this.listenTo(this.collection, 'add', this.addEntry);
    this.listenTo(this.collection, 'sync add', this.render);
    this.listenTo(this.collection, 'refreshAdd', this.refreshAdd);

    this.collection.each( function(model){
      this.addEntry(model);
    }.bind(this));
  },

  redirectToHome: function () {
    Backbone.history.navigate('', {trigger: true});
  },

  subscribe: function (event) {
    $target = $(event.target);
    $target.removeClass('subscribe btn btn-success');
    $target.addClass('unsubscribe btn btn-danger');
    $target.html(
        "<span class='glyphicon glyphicon-minus'></span>Unsubscribe"
    );
    var sub = new Aggredile.Models.UserFeed({feed_id: this.model.get('id')});
    sub.save();
  },

  unsubscribe: function () {
    $target = $(event.target);
    $target.removeClass('unsubscribe btn btn-danger');
    $target.addClass('subscribe btn btn-success');
    $target.html(
        "<span class='glyphicon glyphicon-plus'></span>Subscribe"
    );
    var sub = new Aggredile.Models.UserFeed({id: this.model.get('subscribed')});
    sub.destroy();
  },

  addEntry: function (model) {
    var showView = new Aggredile.Views.EntryShow({model: model});
    this.addSubview('ul.entry-holder', showView);
    this.listenTo(showView, 'activate', this.toggleExpand);
  },

  prependEntry: function (model) {
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
    this.listenToOnce(feed, 'change:id', function(model, id){
      Backbone.history.navigate('feed/' + model.id, {trigger: true});
    });
  },

  refreshAdd: function () {
    var reversedCollection = this.collection.last(this.collection.length).reverse();
    for (var i = 0; i < reversedCollection.length; ++i) {
      this.prependEntry(reversedCollection[i]);
    }
  },

  addMore: function () {
    this.pageCount += 1;
    this.collection.next();
    this.postToTop = false;
  },

  refresh: function (){
    event.preventDefault();
    this.collection.fetch({silent: true, success: function () {
      this.collection.trigger('refreshAdd');
    }.bind(this)});
    this.postToTop = true;
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
    var renderedContent = this.template({feed: this.model});
    this.$el.html(renderedContent);
    this.attachSubviews();
    return this;
  }

});
