require "sinatra"
require "json"
require "sqlite3"
require "./car.rb"

DB = SQLite3::Database.new("car.db")

set :public_folder, "public"

get "/" do
  send_file "public/index.html"
end

get "/car" do
  content_type :json
  car = db_car_to_table(random_car_from_db(DB))
  car.to_json()
end
