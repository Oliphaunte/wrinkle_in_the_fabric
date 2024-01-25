defmodule Blog.Blog do
  @moduledoc """
  Blog posts
  """

  alias Blog.Blog

  use NimblePublisher,
    build: Blog.Post,
    parser: Blog.Parser,
    from: Application.app_dir(:blog, "priv/blog/*.md"),
    as: :posts,
    earmark_options: [postprocessor: &Blog.Processor.process/1]

  @posts Enum.sort_by(@posts, & &1.date, {:desc, Date})

  def list_posts, do: @posts

  @tags @posts |> Enum.flat_map(& &1.tags) |> Enum.uniq() |> Enum.sort()

  def list_tags, do: @tags

  defmodule NotFoundError do
    defexception [:message, plug_status: 404]
  end

  def get_post_by_id!(id) do
    Enum.find(list_posts(), &(&1.id == id)) ||
      raise NotFoundError, "post with id=#{id} not found"
  end

  def list_posts_by_tag!(tag) do
    case Enum.filter(list_posts(), &(tag in &1.tags)) do
      [] -> raise NotFoundError, "posts with tag=#{tag} not found"
      posts -> posts
    end
  end
end
