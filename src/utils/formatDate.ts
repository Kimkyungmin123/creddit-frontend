/**
 * 서버에서 받은 날짜 문자열을 다음과 같이 변환한다.
 *
 * - Desktop: 2020-12-29 13:10:40 -> 2020년 12월 29일 13:10
 * - Mobile: 2020-12-29 13:10:40 -> 2020.12.29 13:10
 */
function formatDate(
  dateString: string,
  { type }: { type: 'desktop' | 'mobile' } = { type: 'desktop' }
) {
  const [date, time] = dateString.split(' ');
  const [year, month, day] = date.split('-');
  const nextTime = time.split(':');
  nextTime.pop();

  return type === 'desktop'
    ? `${year}년 ${month}월 ${day}일 ${nextTime.join(':')}`
    : `${year}.${month}.${day} ${nextTime.join(':')}`;
}

export default formatDate;
