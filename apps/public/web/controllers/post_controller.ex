defmodule Public.PostController do
  use Public.Web, :controller

  def index(conn, _params) do
    html conn, Phoenix.View.render_to_string(
      Public.PostView, "#{Public.Theme.name}/templates/posts.html",
      conn: conn,
      blog: blog(),
      posts: posts(),
      layout: {Public.LayoutView, "#{Public.Theme.name}/layout/layout.html"}
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
    [
      %{
        id: 1,
        title: "Awesome blog post title",
        excerpt: "Here goes the excerpt of the most wonderful post in the world",
        author: %{
          image: nil,
          name: "Janis Miezitis"
        },
        date: "2017-01-27"
      }
    ]
  end
end
