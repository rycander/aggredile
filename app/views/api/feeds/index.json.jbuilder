# json.array! @feeds do |feed|
#   json.title feed.title
#   json.url feed.url
#   json.id feed.id
#   json.entries feed.entries do |entry|
#     json.url entry.url
#     json.title entry.title
#     json.published_at entry.published_at
#     json.content entry.content
#     json.feed_id entry.feed_id
#     json.id entry.id
#   end
# end


json.array!(@feeds) do |feed|
  json.partial!("feed", :feed => feed)
end
