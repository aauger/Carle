require "sinatra"
require "json"

set :public_folder, "public"

get "/" do
  send_file "public/index.html"
end

get "/car" do
  content_type :json
  car = {
    year: "1902",
    make: "AUTOCAR",
    model: "10 HP",
    image_src: "autocar10hp.png",
  }.to_json()
  car
end
