require 'sinatra'
require 'sqlite3'
require 'sinatra/json'
require 'data_uri'
require 'securerandom'
require 'logger'

logger = Logger.new(STDOUT)

# DBの生成
db = SQLite3::Database.new 'db/post.db'
db.results_as_hash = true

get '/' do
  adult = params['adult']
  if adult == "1"
    posts = db.execute("SELECT * FROM pictures where adult = 1 ORDER BY id DESC")
  else
    posts = db.execute("SELECT * FROM pictures ORDER BY id DESC")
  end
  erb :dashboard, {:locals => {:posts => posts}}
end

get '/dashboard' do
  adult = params['adult']
  if adult == "1"
    posts = db.execute("SELECT * FROM pictures where adult = 1 ORDER BY id DESC")
  else
    posts = db.execute("SELECT * FROM pictures ORDER BY id DESC")
  end
  erb :dashboard, {:locals => {:posts => posts}}
end

get '/draw' do
  erb :draw
end

post '/draw' do
  datauri = params['src']
  img = URI::Data.new(datauri).data

  # ファイル名をつける
  name = SecureRandom.hex + '.png'

  # 画像を保存
  File.open("./public/uploads/" + name, "wb") do |file|
    file.write img
  end

  # DBに登録する
  time = Time.now.strftime('%Y-%m-%d %H:%M:%S')
  sql = "INSERT INTO pictures (title, src, adult, posted_at) VALUES (:konoiztitle, '#{name}', :yamaneadult, '#{time}')"
  db.execute_batch(sql,konoiztitle:params['title'],yamaneadult:params['adult'])

  # 終わったらダッシュボードに戻る
  redirect '/dashboard'
end

get '/api/like' do
  posts = db.execute("SELECT * FROM pictures where id = :kansaijin",kansaijin:params['id'] )

  json posts
end

post '/api/like' do
   sql = "UPDATE pictures SET likes = likes +1 WHERE id = :tokyokouka"
   db.execute_batch(sql,tokyokouka:params['id'])

end
