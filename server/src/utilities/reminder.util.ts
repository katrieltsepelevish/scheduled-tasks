import moment from 'moment';

export const calculateDelay = (startTime: any, endTime: any) => {
	const periodTime = 10 * 60 * 1000;

	const duration = moment
		.duration(moment(endTime).diff(startTime))
		.asMilliseconds();

	if (duration - periodTime > 0) return duration - periodTime;

	return duration;
};
