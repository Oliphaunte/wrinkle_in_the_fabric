export const CopyToClipboard = {
  mounted() {
    this.handleEvent("copy-to-clipboard", ({ selector }) => {
      const element = document.querySelector(selector)
      if (element && 'clipboard' in navigator) {
        navigator.clipboard.writeText(element.value).then(() => {
          console.log('Successfully copied to clipboard');
        }).catch((err) => {
          console.error('Could not copy text to clipboard', err);
        });
      } else {
        alert('Sorry, your browser does not support clipboard copy.');
      }
    });
  }
}