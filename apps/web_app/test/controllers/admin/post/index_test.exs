defmodule Admin.Post.IndexTest do
  use WebApp.ConnCase

  test "opens index page", %{conn: conn} do
    post = Backend.Posts.Service.create_empty
    conn = build_conn()
    |> get(admin_post_path(conn, :index))

    assert html_response(conn, 200) =~ post.title
  end
end
