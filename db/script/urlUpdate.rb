
# スキンのURLが分からないからマーケットをパースして調べるやつ

print ''

require 'open-uri'
require 'nokogiri'
require 'uri'

require 'sqlite3'

db = SQLite3::Database.new("payday2.sqlite3")

# select upper(weapon.name) || " | " || skin.name
# from weapon join skin
# on skin.weaponId = weapon.id
# where skin.url = 'url';

skinArray = [
  'CASTIGO .44 REVOLVER | Juarez',
  'AKIMBO CHIMANO COMPACT PISTOLS | Scorpion',
  'AKIMBO INTERCEPTOR 45 PISTOLS | Los Mariachis',
  'AK.762 RIFLE | Pancho Villa',
  'AKIMBO CASTIGO .44 REVOLVERS | Monterrey'
]

qualityArray = [
  ', Battle-Worn',
  ' , Battle-Worn',
  ', Well-Used',
  ' , Well-Used',
  ', Broken-In',
  ' , Broken-In',
  ', Lightly-Marked',
  ' , Lightly-Marked',
  ', Mint-Condition',
  ' , Mint-Condition',
  ', Battle-Worn, Stat Boost',
  ' , Battle-Worn, Stat Boost',
  ', Well-Used, Stat Boost',
  ' , Well-Used, Stat Boost',
  ', Broken-In, Stat Boost',
  ' , Broken-In, Stat Boost',
  ', Lightly-Marked, Stat Boost',
  ' , Lightly-Marked, Stat Boost',
  ', Mint-Condition, Stat Boost',
  ' , Mint-Condition, Stat Boost'
]

for skinHash in skinArray do
  
  skin = skinHash[skinHash.index('|') + 2..-1]
  
  url = 'http://steamcommunity.com/market/search?appid=218620&q='
  url += skinHash
  
  # puts url
  url_escape = URI.escape(url)
  # puts url_escape
  
  charset = nil
  html = open(url_escape) do |f|
    charset = f.charset
    f.read
  end
  
  doc = Nokogiri::HTML.parse(html, nil, charset)
  
  getUrl = false
  imgUrl = ''
  doc.css('div[id="result_0"]').each do |node|
    imgUrl = node.css('img').attribute('src').value
    # puts imgUrl
    imgUrl = imgUrl[51..-9]
    # puts imgUrl
    getUrl = true
  end
  
  if getUrl then
    query = "update Skin set url = '#{imgUrl}' where name = '#{skin}';"
    puts query
    db.execute(query)
  end
  
  for quality in qualityArray do
    
    urlLarge = 'http://steamcommunity.com/market/listings/218620/'
    urlLarge += skinHash.gsub("\/", "-")
    urlLarge += quality
    
    # puts urlLarge
    urlLarge_escape = URI.escape(urlLarge)
    # puts urlLarge_escape
    
    charset = nil
    html = open(urlLarge_escape) do |f|
      charset = f.charset
      f.read
    end
    
    doc = Nokogiri::HTML.parse(html, nil, charset)
    
    imgUrlLarge = ''
    getUrlLarge = false
    doc.css('div[class="market_listing_largeimage"]').each do |node|
      imgUrlLarge = node.css('img').attribute('src').value
      imgUrlLarge = imgUrlLarge[51..-11]
      # puts imgUrlLarge
      getUrlLarge = true
    end
    
    if getUrlLarge then
      query = "update Skin set urlLarge = '#{imgUrlLarge}' where name = '#{skin}';"
      puts query
      db.execute(query)
      break
    else
      puts "#{quality} is not found"
    end
  end
end

puts ''
