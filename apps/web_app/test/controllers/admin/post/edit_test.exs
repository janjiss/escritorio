defmodule Admin.Post.EditTest do
  use WebApp.ConnCase
  import WebApp.Factory

  test "opens edit page", %{conn: conn} do
    post = insert(:post)
    conn = build_conn()
      |> get(admin_post_path(conn, :edit, post.id))

    assert html_response(conn, 200) =~ "data-post-id=\"#{post.id}\""
    assert html_response(conn, 200) =~ "require(\"web/static/js/admin/editor.jsx\")"
  end

  test "returns not found", %{conn: conn} do
    conn = build_conn()
    |> get(admin_post_path(conn, :edit, "0"))

    assert html_response(conn, 404)
  end
end
