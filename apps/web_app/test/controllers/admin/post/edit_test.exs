defmodule Admin.Post.UpdateTest do
  use WebApp.ConnCase

  test "opens edit page", %{conn: conn} do
    post = Backend.Posts.Service.create_empty
    conn = build_conn()
    |> get(admin_post_path(conn, :edit, post.id))

    assert html_response(conn, 200) =~ "data-post-id=\"#{post.id}\""
    assert html_response(conn, 200) =~ "require(\"web/static/js/admin/editor.jsx\")"
  end
end
