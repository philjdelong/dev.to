require "rails_helper"

RSpec.describe ReadingCollections::RefreshReadingCollectionWorker, type: :worker do
  subject(:worker) { described_class.new }

  describe "#perform" do
    it "removes old articles from the collection" do
      user = create(:user)
      collection1 = create(:reading_collection, name: "Coll 1", user: user, tag_list: %w[javascript career], created_at: Time.current - 4.minutes, updated_at: Time.current - 4.minutes)
      article1 = create(:article, user: user, created_at: Time.current - 1.minute)
      collection1.articles << article1

      worker.perform
      articles = ReadingCollection.find(collection1.id).articles
      expect(articles.empty?).to eq(true)

      collection2 = create(:reading_collection, name: "Coll 2", user: user)
      article2 = create(:article, user: user)
      collection2.articles << article2

      worker.perform
      articles2 = ReadingCollection.find(collection2.id).articles
      expect(articles2).to eq([article2])
    end

    it "re-populates articles for collection" do
      user = create(:user)
      collection1 = create(:reading_collection, name: "Coll 1",
                                                user: user,
                                                tag_list: %w[javascript career],
                                                created_at: Time.current - 4.minutes,
                                                updated_at: Time.current - 4.minutes)

      article1 = create(:article, user: user, created_at: Time.current - 1.minute)
      collection1.articles << article1

      worker.perform

      ReadingCollection.find(collection1.id).update(updated_at: Time.current - 4.minutes)

      article2 = create(:article, user: user, tags: %w[javascript])

      worker.perform

      articles = ReadingCollection.find(collection1.id).articles
      expect(articles).to eq([article2])
    end
  end
end
