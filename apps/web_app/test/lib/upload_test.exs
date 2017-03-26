defmodule UploadTest do
  use ExUnit.Case

  test "file upload without extension" do
    file = %Plug.Upload{
      content_type: "image/png",
      filename: "code",
      path: Path.absname("test/fixtures/test.png")
    }
    upload_path = Path.absname("test/uploads")
    WebApp.Upload.upload(file, upload_path)

    assert File.exists?(Path.join(upload_path, "code.png"))
    File.rm!(Path.join(upload_path, "code.png"))
  end

  test "file upload with extension" do
    file = %Plug.Upload{
      content_type: "image/png",
      filename: "code.png",
      path: Path.absname("test/fixtures/test.png")
    }
    upload_path = Path.absname("test/uploads")
    WebApp.Upload.upload(file, upload_path)

    assert File.exists?(Path.join(upload_path, "code.png"))
    File.rm!(Path.join(upload_path, "code.png"))
  end
end
