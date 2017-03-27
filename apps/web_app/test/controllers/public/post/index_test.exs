defmodule Admin.Public.IndexTest do
  use WebApp.ConnCase
  import WebApp.Factory

  test "opens index page", %{conn: conn} do
    post = insert(:post)

    conn = build_conn()
    |> get(public_post_path(conn, :index))

    assert html_response(conn, 200) =~ post.title
  end
end
