defmodule WebApp.Upload do
  def upload(file, upload_path) do
    content = File.read!(file.path)
    file_extension = MIME.extensions(file.content_type) |> List.first

    file_name = Path.basename(file.filename, Path.extname(file.filename))

    constructed_file_name = "#{file_name}.#{file_extension}"

    Path.absname(upload_path) |>
    Path.join(constructed_file_name) |>
    File.write!(content)

    %{ file: "/uploads/#{constructed_file_name}" }
  end
end
