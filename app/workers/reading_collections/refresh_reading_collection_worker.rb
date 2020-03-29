module ReadingCollections
  class RefreshReadingCollectionWorker
    include Sidekiq::Worker

    sidekiq_options queue: :high_priority, retry: 10

    def perform
      reading_collections = ReadingCollection.where("updated_at < ?", 10.seconds.ago)
      reading_collections.each do |reading_collection|
        reading_collection.articles.clear
        articles = reading_collection.get_articles
        reading_collection.articles << articles
        reading_collection.update(updated_at: Time.current)
      end
    end
  end
end
