#!ruby
print "Content-type: text/html\n\n";

require 'cgi'
require 'open-uri'
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

file = open(steamInventoryJsonName)
code, message = file.status

if code == '200'
  result = 'true';
  File.open(saveJsonName,'w') do |output|
    output.puts(file.read)
  end
end

puts result
