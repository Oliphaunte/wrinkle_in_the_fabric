export const StickyHeader = {
  mounted() {
    const container = document.querySelector('.scroll-container')

    this.handleScroll = () => {
      if (container.scrollTop > 0) {
        this.el.classList.add('bg-active')
      } else {
        this.el.classList.remove('bg-active')
      }
    }

    // Check the scroll position immediately when mounted
    this.handleScroll()

    container.addEventListener('scroll', this.handleScroll)
  },
  updated() {
    this.handleScroll()
  },
  destroyed() {
    const container = document.querySelector('.scroll-container')

    container.removeEventListener('scroll', this.handleScroll)
  },
}
