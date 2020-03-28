class ReadingCollection < ApplicationRecord
  belongs_to :user
  has_many :reading_collection_articles, dependent: :destroy
  has_many :articles, through: :reading_collection_articles
  validates :name, :user_id, presence: { presence: true }
  validates :slug, presence: true, format: /\A[0-9a-z\-_]*\z/, uniqueness: { scope: :user_id }
  before_validation :set_slug
  acts_as_taggable_on :tags

  def get_articles
    Article.where("created_at >= ?", 5.minutes.ago).
      tagged_with(tag_list, any: true).
      order("page_views_count DESC").
      limit(10)
  end

  private

  def set_slug
    self.slug = name.to_s.downcase.parameterize.tr("_", "") + "-" + rand(100_000).to_s(26)
  end
end
