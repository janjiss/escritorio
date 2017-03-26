defmodule Backend.Repo.Migrations.AddPosts do
  use Ecto.Migration

  def change do
    create table(:posts) do
      add :title, :string
      add :raw, :map
      add :body, :string
      add :excerpt, :string

      timestamps()
    end
  end
end
