defmodule BlogWeb.Blog.PostLive do
  use BlogWeb, :live_view

  @impl true
  def mount(%{"post" => post}, _session, socket) do
    {:ok, socket |> assign(:post, Blog.Blog.get_post_by_id!(post))}
  end

  @impl true
  def render(assigns) do
    ~H"""
    <div class="mx-auto px-4 max-w-4xl h-full">
      <div class="py-5 text-center">
        <h1 class="text-5xl font-extrabold"><%= @post.title %></h1>
        <p class="text-sm">
          <dt class="sr-only">Published on</dt>
          <dd class="text-base font-medium leading-6">
            <time datetime={@post.date}><%= @post.date %></time>
          </dd>
        </p>
      </div>

      <div class="prose pb-8 max-w-4xl text-lg">
        <%= raw(@post.body) %>
      </div>
    </div>
    """
  end
end
