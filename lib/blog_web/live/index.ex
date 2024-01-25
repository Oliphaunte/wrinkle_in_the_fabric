defmodule BlogWeb.IndexLive do
  use BlogWeb, :live_view

  @impl true
  def mount(_params, _session, socket) do
    {:ok, socket |> assign(:posts, Blog.Blog.list_posts())}
  end

  @impl true
  def handle_params(_params, _uri, socket) do
    {:noreply, socket}
  end

  @impl true
  def render(assigns) do
    ~H"""
    <div class="w-full h-full">
      <p class="mx-auto max-w-xl text-center mt-8">
        Welcome to Wrinkle in the Fabric, a random collection of posts regarding technology, technologists, and the inevitable technophobia
      </p>

      <p class="mx-auto max-w-xl text-center mt-8">
        This site is constantly updated and will remain so for the foreseable future. (Note to self, start a newsletter)
      </p>

      <div class="flex flex-wrap mt-8">
        <h2>Posts</h2>

        <ul class="mt-8">
          <li :for={post <- @posts} class="py-4">
            <article class="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
              <dl>
                <dt class="sr-only">Published on</dt>
                <dd class="text-base font-medium leading-6 text-gray-500">
                  <time datetime={post.date}><%= post.date %></time>
                </dd>
              </dl>
              <div class="space-y-3 xl:col-span-3">
                <div>
                  <h3 class="text-2xl font-bold leading-8 tracking-tight">
                    <.link navigate={~p"/posts/#{post.id}"} class="text-gray-900">
                      <%= post.title %>
                    </.link>
                  </h3>
                  <ul class="flex flex-wrap">
                    <li :for={tag <- post.tags} class="mr-3">
                      <.link navigate={~p"/tags/#{tag}"} class="text-sm font-light uppercase text-black/50">
                        <%= tag %>
                      </.link>
                    </li>
                  </ul>
                </div>
                <div class="prose max-w-none text-black/50">
                  <%= post.description %>
                </div>
              </div>
            </article>
          </li>
        </ul>
      </div>
    </div>
    """
  end
end
