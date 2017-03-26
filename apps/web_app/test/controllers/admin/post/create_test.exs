defmodule Admin.Post.CreateTest do
  use WebApp.ConnCase

  test "creates empty post and redirects", %{conn: conn} do
    conn = build_conn()
    |> get(admin_post_path(conn, :new))

    assert html_response(conn, 302)
    assert redirected_to(conn) =~ "/admin/posts/"
    assert redirected_to(conn) =~ "/edit"
  end
end
