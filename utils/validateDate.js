module.exports = function (query) {
	if (query.day && (query.day > 31 || query.day <= 0)) {
		return false;
	}
	if (query.month && query.month > 0 && query.month <= 12) {
		if (query.month == 2 && query.day > 29) return false;
		if ([4, 6, 9, 11].includes(query.month) && query.day > 30) return false;
	}
	if (
		query.year &&
		(query.year < 2000 || query.year > new Date(Date.now()).getFullYear())
	) {
		return false;
	}
	return true;
};
