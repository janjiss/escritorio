defmodule WebApp.Factory do
  use ExMachina.Ecto, repo: WebApp.Repo

  def post_factory do
    %WebApp.Post{
      title: "Title",
      raw: %{},
      body: "Body",
      excerpt: "Excerpt"
    }
  end
end
