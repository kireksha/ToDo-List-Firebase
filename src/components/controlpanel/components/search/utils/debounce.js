export const debounce = (fn, delay) => {
	let timerID;
	return (...args) => {
		clearTimeout(timerID);
		timerID = setTimeout(fn, delay, ...args);
	};
};
