class ReadingCollectionsController < ApplicationController
  def show
    reading_collection = ReadingCollection.find_by(slug: params[:slug])

    @collection = reading_collection.to_json
    @articles = reading_collection.articles.includes([:taggings]).to_json
  end

  def new; end
end
