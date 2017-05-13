#!ruby
print "Content-type: text/html\n\n";

require 'cgi'
require 'open-uri'
require 'fileutils'

objCgi = CGI.new

result = 'false'

_steamId = objCgi["steamId"]
_appId = objCgi["appId"]

steamInventoryJsonName = 'http://';
steamInventoryJsonName += 'steamcommunity.com/profiles/';
steamInventoryJsonName += "#{_steamId}/";
steamInventoryJsonName += 'inventory/';
steamInventoryJsonName += 'json/';
steamInventoryJsonName += "#{_appId}/";
steamInventoryJsonName += '2.php';

saveDirectory = File.expand_path("..", Dir.pwd);
saveDirectory += '/';
saveDirectory += 'downloads/';
saveDirectory += 'json';

if !File.exist?(saveDirectory)
  FileUtils.mkdir_p(saveDirectory)
end

saveJsonName = saveDirectory;
saveJsonName += '/';
saveJsonName += "#{_steamId}_#{_appId}.json";

file = open(steamInventoryJsonName)
code, message = file.status

if code == '200'
  result = 'true';
  File.open(saveJsonName,'w') do |output|
    output.puts(file.read)
  end
end

puts result
