defmodule WebApp.PostController do
  use WebApp.Web, :controller

  def index(conn, _params) do
    html conn, Phoenix.View.render_to_string(
      WebApp.PostView, "#{WebApp.Theme.name}/templates/posts.html",
      conn: conn,
      blog: blog(),
      posts: posts(),
      layout: {WebApp.LayoutView, "#{WebApp.Theme.name}/layout/layout.html"}
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
    Backend.Posts.Service.all
  end
end
