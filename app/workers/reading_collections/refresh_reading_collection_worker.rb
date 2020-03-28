module ReadingCollections
  class RefreshReadingCollectionWorker
    include Sidekiq::Worker

    sidekiq_options queue: :high_priority, retry: 10

    def perform
      reading_collections = ReadingCollection.where("updated_at < ?", 1.minute.ago)
      reading_collections.each do |reading_collection|
        reading_collection.articles.clear
        reading_collection.get_articles
      end
    end
  end
end
