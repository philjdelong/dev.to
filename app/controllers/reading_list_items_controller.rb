class ReadingListItemsController < ApplicationController
  # action for the /readinglist route
  def index
    # sets @reading_list_items_index to true
    @reading_list_items_index = true
    # set_view is  private method below
    set_view
    # generate_algolia_search_key is a private method below
    generate_algolia_search_key
  end

  # # a new action would go here for the new form
  # def new
  # # render the new view -- > form that FE builds
  # # POST /reading_list_items
  # end
  #
  # def create
  #   # save in a DB
  #   # where a new RL gets made
  # end

  def update
    # changing the name of the collection IF we allow
    # removing articles froma collection, IF we allow it
    # a background worker could be kicked of here somewhere to update the reading list w/ new articles
    # does that remove old articles? or add to it
    @reaction = Reaction.find(params[:id])
    not_authorized if @reaction.user_id != session_current_user_id

    @reaction.status = params[:current_status] == "archived" ? "valid" : "archived"
    @reaction.save
    head :ok
  end

  private

  def generate_algolia_search_key
    # uses a session to grab the current users id and pass it into params for an angolia config
    params = { filters: "viewable_by:#{session_current_user_id}" }
    # generates an algolia search key that is stored in the instance variable
    # generate_secured_api_key is specific to the algolia gem
    @secured_algolia_key = Algolia.generate_secured_api_key(
      ApplicationConfig["ALGOLIASEARCH_SEARCH_ONLY_KEY"], params
    )
  end

  def set_view
    # not completely sure where the params[:view] would come from
    # view is an important instance variable that will be available to the view later
    # setting it dependent on if we have the params archive coming in
    @view = if params[:view] == "archive"
              "archived"
            else
              "valid"
            end
  end
end
