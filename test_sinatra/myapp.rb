# myapp.rb
require 'sinatra'

get '/:name' do
	"Hello #{params[:name]}".strip
end
