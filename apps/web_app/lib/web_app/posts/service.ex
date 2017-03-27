defmodule WebApp.Posts.Service do
  alias WebApp.Posts.Queries
  alias WebApp.Post

  def all do
    Queries.all
  end

  def create_empty do
    Queries.create(%Post{})
  end

  def one(id) do
    Queries.one(id)
  end

  def update(id, params) do
    Queries.update(id, params)
  end
end
