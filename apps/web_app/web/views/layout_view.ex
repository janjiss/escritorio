defmodule WebApp.LayoutView do
  use WebApp.DynamicView, root: "../../themes", pattern: "**/layout/*"

  def theme_asset_path(path) do
    Path.join(path, "")
  end

  def meta_title do
  end

  def meta_description do
  end

end
