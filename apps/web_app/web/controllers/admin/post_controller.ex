defmodule WebApp.Admin.PostController do
  use WebApp.Web, :controller

  def index(conn, _params) do
    render conn, "index.html", posts: posts(), layout: {WebApp.Admin.LayoutView, "app.html"}
  end

  def new(conn, _params) do
    post = Backend.Posts.Service.create_empty
    redirect conn, to: "/admin/posts/#{post.id}/edit"
  end

  def edit(conn, %{"id" => id}) do
    render conn, "edit.html", post: Backend.Posts.Service.one(id), layout: {WebApp.Admin.LayoutView, "app.html"}
  end

  def posts do
    Backend.Posts.Service.all
  end
end
