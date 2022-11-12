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
	const targetRow = bodyEl.children.item(targetIdx)!;
	const observer = new IntersectionObserver((entries) => {
		if (entries[0].isIntersecting) {
			intersected();
		}
	});
	observer.observe(targetRow.children[0]);
	return () => observer.unobserve(targetRow);
};
