json.array!(@entries) do |entry|
  json.partial!(
    'entry',
    entry: entry,
    entry_visit_id: @entry_visit_hashes[entry.id],
    feed_title: @feed_title_hash[entry.feed_id]
  )
end
