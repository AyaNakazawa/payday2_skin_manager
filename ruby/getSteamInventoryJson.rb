#!ruby
print "Content-type: text/html\n\n";

require 'cgi'
require 'fileutils'

objCgi = CGI.new

result = 'false'

_steamid = objCgi["steamid"]
_appid = objCgi["appid"]

steamInventoryJsonName = 'http://';
steamInventoryJsonName += 'steamcommunity.com/profiles/';
steamInventoryJsonName += "#{_steamid}/";
steamInventoryJsonName += 'inventory/';
steamInventoryJsonName += 'json/';
steamInventoryJsonName += "#{_appid}/";
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
saveJsonName += "#{_steamid}_#{_appid}.json";

puts result
