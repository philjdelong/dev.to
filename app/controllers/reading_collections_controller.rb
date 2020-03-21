class ReadingCollectionsController < ApplicationController
  def index
    # Maybe signaling the reading index can be rendered?
    # looking at application.html.erb I think the below line is what is passed into the 'univarsal-content-wrapper'
    @reading_collections_index = true

    # private method used to run a check on "archive" status
    set_view

    # private method used to run a check on valid current user
    generate_algolia_search_key
  end

  private

  def generate_algolia_search_key
    params = { filters: "viewable_by:#{session_current_user_id}" }
    @secured_algolia_key = Algolia.generate_secured_api_key(
      ApplicationConfig["ALGOLIASEARCH_SEARCH_ONLY_KEY"], params
    )
  end

  def set_view
    @view = if params[:view] == "archive"
              "archived"
            else
              "valid"
            end
  end
end
