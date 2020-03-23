# here's a test for the readling_list endpoints
# can add new tests here
require "rails_helper"

RSpec.describe "ReadingListItems", type: :request do
  let(:user) { create(:user) }
  let(:separate_user) { create(:user) }
  let(:article) { create(:article, user_id: user.id) }
  let(:reaction) { create(:reaction, reactable: article, user_id: user.id) }
  let(:unauthorized_reaction) { create(:reaction, reactable: article, user_id: separate_user.id) }

  before do
    sign_in user
  end
  # test for the index

  describe "GET reading list" do
    it "returns reading list page" do
      get "/readinglist"
      expect(response.body).to include("Reading List")
    end
  end
  # test for create

  describe "PUT reading_list_items/:id" do
    it "returns archives item if no param" do
      put "/reading_list_items/#{reaction.id}"
      expect(reaction.reload.status).to eq("archived")
    end

    it "unarchives an item if current_status is passed as archived" do
      put "/reading_list_items/#{reaction.id}", params: { current_status: "archived" }
      expect(reaction.reload.status).to eq("valid")
    end

    it "raises NotAuthorizedError if current_user is not the reaction user" do
      expect { put "/reading_list_items/#{unauthorized_reaction.id}" }.to raise_error Pundit::NotAuthorizedError
    end
  end

  # describe "POST reading_list" do
  #   params = { front end k:v pairs }
  #   post
  # end
end
