defmodule Posts.ServiceTest do
  import Backend.Factory
  use ExUnit.Case
  doctest Backend

  alias Backend.Posts.Service

  test "empty post creation" do
    post = Service.create_empty
    assert "" == post.title
    assert %{} == post.raw
    assert "" == post.body
    assert "" == post.excerpt
  end

  test "fetching single record" do
    post = insert(:post)
    assert post == Service.one(post.id)
  end

  test "update of a record" do
    post = insert(:post)
    params = %{ "raw" => %{"raw" => "stuff"}, "title" => "New Title", "body" => "New Body", "excerpt" => "New Excerpt" }
    updated_post = Service.update(post.id, params)
    assert params["raw"] == updated_post.raw
    assert params["title"] == updated_post.title
    assert params["body"] == updated_post.body
    assert params["excerpt"] == updated_post.excerpt
  end
end
