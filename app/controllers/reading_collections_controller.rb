class ReadingCollectionsController < ApplicationController
  def show
    @collection = ReadingCollection.find_by(slug: params[:slug]).to_json
    @articles = ReadingCollection.find_by(slug: params[:slug]).articles.to_json
  end

  def new; end
end
