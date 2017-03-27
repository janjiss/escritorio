defmodule Posts.ServiceTest do

  use WebApp.ConnCase
  import WebApp.Factory
  alias WebApp.Posts.Service

  doctest WebApp

  describe "Service.create_empty/0" do
    test "empty post creation" do
      post = Service.create_empty
      assert "" == post.title
      assert %{} == post.raw
      assert "" == post.body
      assert "" == post.excerpt
    end
  end

  describe "Service.one/1" do
    test "record found" do
      post = insert(:post)
      assert post == Service.one(post.id)
    end

    test "record not found" do
      assert nil == Service.one(10000)
    end
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
