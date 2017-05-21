#!ruby
print "Content-type: text/html\n\n";

require 'cgi'
require 'sqlite3'
require 'json'

objCgi = CGI.new
_query = objCgi["query"] + ';'

result = {}

db = SQLite3::Database.new("../db/payday2.sqlite3")
db.results_as_hash = true
db.execute(_query) do |row|
  result[row['name']] = row
end

print result.to_json
