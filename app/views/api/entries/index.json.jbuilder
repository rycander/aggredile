json.array!(@entries) do |entry|
  json.partial!(
    'entry',
    entry: entry,
    entry_visit_id: @entry_visit_hashes[entry.id]
  )
end
