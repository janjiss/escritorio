defmodule Admin.Post.IndexTest do
  use WebApp.ConnCase
  import WebApp.Factory

  test "opens index page", %{conn: conn} do
    insert(:post)

    conn = build_conn()
    |> get(admin_post_path(conn, :index))

    assert html_response(conn, 200)
  end
end
