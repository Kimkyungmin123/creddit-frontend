/**
 * 서버에서 받은 ISO 날짜 문자열을 다음과 같이 변환한다.
 *
 * - Desktop: 2022-04-26T15:23:14.037497 -> 2022년 4월 26일 15:23
 * - Mobile: 2022-04-26T15:23:14.037497 -> 2022.4.26 15:23
 */
function formatDate(
  dateString: string,
  { hideTime, type = 'long' }: Options = { type: 'long' }
) {
  const [date, time] = dateString.split('T');
  const [year, month, day] = date.split('-').map((str) => Number(str));
  const nextTime = hideTime ? '' : ` ${time.split(':').slice(0, 2).join(':')}`;

  return type === 'long'
    ? `${year}년 ${month}월 ${day}일${nextTime}`
    : `${year}.${month}.${day}${nextTime}`;
}

type Options = {
  type?: 'long' | 'short';
  hideTime?: boolean;
};

export default formatDate;
