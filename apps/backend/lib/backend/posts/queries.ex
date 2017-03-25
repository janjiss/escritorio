defmodule Backend.Posts.Queries do
  alias Backend.{Repo, Post}
  import Ecto.Query

  def all do
    (from p in Post) |> Repo.all
  end
end
