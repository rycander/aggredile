Aggredile.Models.Feed = Backbone.Model.extend({
  urlRoot: 'api/feeds',


  entries: function () {
    this._entries = this._entries ||
      new Aggredile.Collections.Entries([], { feed: this });
    return this._entries;
  },

  parse: function (payload) {
    if (payload.entries) {
      this.entries().set(payload.entries, { parse: true });
      delete payload.entries;
    }

    return payload;
  }
});
