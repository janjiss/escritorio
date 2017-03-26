defmodule WebApp.Public.PostController do
  use WebApp.Web, :controller

  def index(conn, _params) do
    html conn, Phoenix.View.render_to_string(
      WebApp.Public.PostView, "#{WebApp.Theme.name}/templates/posts.html",
      conn: conn,
      blog: blog(),
      posts: posts(),
      layout: {WebApp.Public.LayoutView, "#{WebApp.Theme.name}/layout/layout.html"}
    )
  end

  def blog do
    %{
      url: "",
      header_includes: "",
      title: "Title of my awesome blog" ,
      description: "Description of my awsome blog",
      footer_includes: "",
      cover: nil,
      logo: nil
    }
  end

  def posts do
    Enum.map(Backend.Posts.Service.all, fn(post) ->
      Map.merge(post, %{author: author(), date: "2017, 03, 3"})
    end)
  end

  def author do
    %{
      name: "Janis Miezitis",
      image: nil,
    }
  end
end
