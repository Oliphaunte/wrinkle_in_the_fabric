defmodule Blog do
  @moduledoc """
  Blog keeps the contexts that define your domain
  and business logic.

  Contexts are also responsible for managing your data, regardless
  if it comes from the database, an external API or others.
  """
  def is_dev?() do
    Application.get_env(:blog, BlogWeb.Endpoint)[:env] in [:dev, :test]
  end

  def host() do
    if is_dev?(), do: "wrinkleinthefabric.lvh.me", else: "wrinkleinthefabric.com"
  end
end
