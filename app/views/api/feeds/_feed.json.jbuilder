json.(feed, :id, :url, :title, :description, :updated_at)


# entries ||= nil
# unless entries.nil?
#   json.entries(entries) do |entry|
#     json.partial!('api/entries/entry', entry: entry, entry_visit_id: entry_visit_hashes[entry.id], feed_title: feed.title)
#   end
# end
