defmodule Blog.Blog.Post do
  @moduledoc """
  Blog post
  """

  @enforce_keys [:id, :title, :body, :description, :tags, :date]
  defstruct [:id, :title, :body, :description, :tags, :date]

  def build(filename, attrs, body) do
    [year, month, day, id] =
      filename
      |> Path.rootname()
      |> Path.split()
      |> List.last()
      |> String.split("-", parts: 4)

    date = Date.from_iso8601!("#{year}-#{month}-#{day}")

    struct!(__MODULE__, [id: id, date: date, body: body] ++ Map.to_list(attrs))
  end
end
