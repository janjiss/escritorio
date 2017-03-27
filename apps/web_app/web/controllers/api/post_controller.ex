defmodule WebApp.Api.PostController do
  use WebApp.Web, :controller

  def show(conn, %{"id" => id}) do
    post = WebApp.Posts.Service.one(id)
    json conn, %{ id: post.id, raw: post.raw }
  end

  def update(conn, %{ "id" => id, "post" => post_params }) do
    case WebApp.Posts.Service.update(id, post_params) do
      nil ->
        conn
        |> put_status(404)
        |> json(%{ error: "Not Found" })
      post ->
        json conn, %{ id: id, raw: post.raw }
    end
  end
end
