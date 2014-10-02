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
    this.listenTo(this.collection, 'add', this.addEntry);
    this.listenTo(this.collection, 'sync add', this.render);
    view = this;
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

  newFeed: function (event) {
    alert('getting here');
    event.preventDefault();
    var url = $('#new-feed-url').val();
    $('#new-feed-url').val('');
    var feed = new Aggredile.Models.Feed({url: url});
    feed.save();
    this.listenToOnce(feed, 'change:id', function(model, id){
      Backbone.history.navigate('feed/' + model.id, {trigger: true});
    });
  },

  addMore: function () {
    this.pageCount += 1;
    this.collection.next();
  },

  refresh: function (){
    event.preventDefault();
    this.collection.fetch();
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
