defmodule WebApp.Api.PostController do
  use WebApp.Web, :controller

  def show(conn, %{"id" => id}) do
    post = Backend.Posts.Service.one(id)
    json conn, %{ id: post.id, raw: post.raw }
  end

  def update(conn, %{ "id" => id, "post" => post }) do
    updated_post = Backend.Posts.Service.update(id, post)
    json conn, %{ id: id, raw: updated_post.raw }
  end
end
