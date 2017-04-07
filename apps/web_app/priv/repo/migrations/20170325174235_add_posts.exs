defmodule WebApp.Repo.Migrations.AddPosts do
  use Ecto.Migration

  def change do
    create table(:posts) do
      add :title, :string
      add :raw, :map
      add :body, :text
      add :excerpt, :text

      timestamps()
    end
  end
end
