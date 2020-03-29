require "rails_helper"

RSpec.describe "Views a collection", type: :request do
  let_it_be(:user) { create(:user) }
  let_it_be(:article1, reload: true) { create(:article, :with_notification_subscription, user: user) }
  let_it_be(:article2, reload: true) { create(:article, :with_notification_subscription, user: user) }
  let_it_be(:article3, reload: true) { create(:article, :with_notification_subscription, user: user) }
  let_it_be(:article4, reload: true) { create(:article, :with_notification_subscription, user: user) }
  let_it_be(:reading_collection) { create(:reading_collection, user: user) }
  let_it_be(:reading_collection2) { create(:reading_collection, user: user) }

  before do
    user.reading_collections.first.articles << [article1, article2, article3]
    sign_in user
  end

  it "shows a reading collection" do
    get "/readingcollections/#{reading_collection.slug}"

    expect(response.body.include?(reading_collection.name)).to eq(true)
    expect(response.body.include?(reading_collection2.name)).to eq(false)
  end

  it "shows only the articles associated with the collection" do
    get "/readingcollections/#{reading_collection.slug}"

    expect(response.body.include?(article1.title)).to eq(true)
    expect(response.body.include?(article2.title)).to eq(true)
    expect(response.body.include?(article3.title)).to eq(true)
    expect(response.body.include?(article4.title)).to eq(false)
  end

  it "behaves appropriately if user signs out" do
    sign_out user

    get "/readingcollections/#{reading_collection.slug}"

    expect(response.body.include?(reading_collection.name)).to eq(true)
    expect(response.body.include?(reading_collection2.name)).to eq(false)
  end
end
