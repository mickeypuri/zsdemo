export const debounce = (func, delay) => {
	let timerId;
	return (...args) => {
		const boundFunc = func.bind(this, ...args);
		clearTimeout(timerId);
		timerId = setTimeout(boundFunc, delay);
	};
};
