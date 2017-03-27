defmodule WebApp.Posts.Queries do
  alias WebApp.{Repo, Post}
  import Ecto.Query

  def all do
    (from p in Post) |> Repo.all
  end

  def create(post) do
    Repo.insert!(post)
  end

  def one(id) do
    Repo.one(from(p in Post, where: p.id == ^id))
  end

  def update(id, params) do
    post = Repo.get!(Post, id)
    changeset = Ecto.Changeset.change(post, raw: params["raw"], title: params["title"], body: params["body"], excerpt: params["excerpt"])
    { :ok, post } = Repo.update(changeset)
    post
  end
end
