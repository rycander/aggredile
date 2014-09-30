Aggredile.Collections.AllEntries = Backbone.Collection.extend ({
  model: Aggredile.Models.Entry,

  url: function() {
    return "api/entries/" + this.page();
  },

  page: function () {
    this._page = this._page || 1;
    return this._page;
  },

  next: function () {
    this._page++;
    this.fetch();
  },

  initialize: function (options) {
  }

});
Aggredile.Collections.entries = new Aggredile.Collections.AllEntries({data: {page: 1}});
