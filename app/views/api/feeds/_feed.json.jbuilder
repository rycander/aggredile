json.(feed, :id, :url, :title, :updated_at)

entries ||= nil
unless entries.nil?
  json.entries(entries) do |entry|
    json.partial!('api/entries/entry', entry: entry)
  end
end