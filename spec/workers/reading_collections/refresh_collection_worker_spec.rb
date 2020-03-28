# require "rails_helper"

# RSpec.describe ReadingCollections::RefreshReadingCollectionWorker, type: :worker do
#   subject(:worker) { described_class.new }

#   describe "#perform" do
#     xit "it updates a collection on a certain time interval" do
#       user = create(:user)
#       collection1 = create(:reading_collection, name: "Coll 1", user: user)
#       create(:reading_collection, name: "Coll 3", user: user)
#       article1 = create(:article, user: user)
#       collection1.articles << article1

#       sleep 10

#       worker.perform

#       # articles = collection1.articles
#       articles = ReadingCollection.find(collection1.id).articles
#       expect(articles.empty?).to eq(true)

#       collection2 = create(:reading_collection, name: "Coll 2", user: user)
#       article2 = create(:article, user: user)

#       collection2.articles << article2
#       worker.perform

#       articles2 = ReadingCollection.find(collection2.id).articles

#       expect(articles2).to eq([article2])
#     end
#   end
# end

# Find reading ReadingCollections
# where updated_at < '1 week'
# on each collection clear articles (joins table?)
# run .get_articles on each collection
# each collection .save
