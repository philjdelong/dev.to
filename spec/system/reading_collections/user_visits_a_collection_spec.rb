require "rails_helper"

RSpec.describe "Views a collection", type: :system do
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
    visit "/readingcollections/#{reading_collection.slug}"
  end

  it "shows a reading collection" do
    expect(page).to have_content(reading_collection.name)
    expect(page).not_to have_content(reading_collection2.name)
  end

  it "shows only the articles associated with the collection" do
    expect(page).to have_content(article1.title)
    expect(page).to have_content(article2.title)
    expect(page).to have_content(article3.title)

    expect(page).not_to have_content(article4.title)
    expect(page).to have_css(".article", count: 3)
  end

  it "behaves appropriately if user signs out" do
    sign_out user

    visit "/readingcollections/#{reading_collection.slug}"

    # still showing the page - do we need conditional for user?
    expect(page).not_to have_content(reading_collection.name)
    expect(page).not_to have_css(".article")
  end
end
