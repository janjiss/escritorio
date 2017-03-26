defmodule Backend.Factory do
  use ExMachina.Ecto, repo: Backend.Repo

  def post_factory do
    %Backend.Post{
      title: "Title",
      raw: %{},
      body: "Body",
      excerpt: "Excerpt"
    }
  end
end
