export const watchForLastRow = (bodyEl: Element, intersected: () => void) => {
  const targetRow = bodyEl.children.item(bodyEl.children.length - 5)!;
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      intersected();
    }
  });
  observer.observe(targetRow.children[0]);
  return () => observer.unobserve(targetRow);
};
