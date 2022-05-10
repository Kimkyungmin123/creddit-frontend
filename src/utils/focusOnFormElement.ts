function focusOnFormElement(name: string) {
  const element = document.querySelector<
    HTMLInputElement | HTMLTextAreaElement
  >(`[name="${name}"]`);
  element?.focus();
}

export default focusOnFormElement;
