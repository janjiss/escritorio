defmodule WebApp.Admin.PostController do
  use WebApp.Web, :controller

  def index(conn, _params) do
    render conn, "index.html", posts: posts(), layout: { WebApp.Admin.LayoutView, "app.html" }
  end

  def new(conn, _params) do
    post = WebApp.Posts.Service.create_empty
    redirect conn, to: "/admin/posts/#{post.id}/edit"
  end

  def edit(conn, %{"id" => id}) do
    case WebApp.Posts.Service.one(id) do
      nil ->
        conn
         |> put_status(404)
         |> html(WebApp.ErrorView.render("404.html"))
      post ->
        render conn, "edit.html", post: post, layout: { WebApp.Admin.LayoutView, "app.html" }
    end
  end

  def posts do
    WebApp.Posts.Service.all
  end
end
