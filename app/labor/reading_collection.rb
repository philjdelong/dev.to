class ReadingCollection
  attr_accessor :user
  def initialize(user)
    @user = user
  end

  # list collections in order of creation
  def get
    # need to create reading_collections table
    ReadingCollection.
      where(user_id: params[:id])
    order("reading_collections.created_at DESC")

    #   Article.
    #     joins(:reactions).
    #     includes(:user).
    #     where(reactions: reaction_criteria).
    #     order("reactions.created_at DESC")
  end

  # cache reading collections ids to enhance perfomance
  def cached_ids_of_reading_collections
    Rails.cache.fetch("reading_collections_ids_of_collections_#{user.id}_#{user.updated_at.rfc3339}") do
      ids_of_reading_collections
    end
  end

  # helper method to define reading collections (query)
  def ids_of_reading_collections
    ReadingCollection.where(user_id: user.id).order("created_at DESC").pluck(:reading_collection_id)
  end

  # helper method to count how many reading collections are in the list
  def count
    get.size
  end
end
# Won't need reactions unless we want to make collections interract-able
#     def reaction_criteria
#       { user_id: user.id, reactable_type: "Article", category: "reading_collection" }
#     end
