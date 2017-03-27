defmodule Admin.Api.UpdateTest do
  use WebApp.ConnCase
  import WebApp.Factory

  test "post update", %{conn: conn} do
    post = insert(:post)

    conn = build_conn()
      |> put_req_header("accept", "application/json")
      |> put(api_post_path(conn, :update, post.id), post: %{})

    assert json_response(conn, 200)
  end

  test "post not found", %{conn: conn} do
    conn = build_conn()
      |> put_req_header("accept", "application/json")
      |> put(api_post_path(conn, :update, 0), post: %{})

    assert json_response(conn, 404) == %{ "error" => "Not Found"}
  end
end
