Aggredile.Collections.AllEntries = Backbone.Collection.extend ({
  model: Aggredile.Models.Entry,

  initialize: function (model,  options) {
    this.id = options.id;
  },

  url: function() {
    if (this.id) return 'api/feeds/'+ this.id + '/entries';
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

});
Aggredile.Collections.entries = new Aggredile.Collections.AllEntries([], {});
