export const watchForLastRow = (
	bodyEl: Element,
	intersected: () => void,
	padding = 0
) => {
	const targetIdx = bodyEl.children.length - 1 - padding;
	if (targetIdx <= 0) {
		return;
	}
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const targetEl = bodyEl.children.item(targetIdx)!.children[0]!;
	const observer = new IntersectionObserver((entries) => {
		if (entries[0].isIntersecting) {
			intersected();
		}
	});
	observer.observe(targetEl);
	return () => observer.unobserve(targetEl);
};
