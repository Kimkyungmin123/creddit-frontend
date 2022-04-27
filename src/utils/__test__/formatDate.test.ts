import formatDate from 'utils/formatDate';

describe('formatDate', () => {
  const date = '2022-04-26T15:23:14.037497';
  beforeAll(() => {});

  it('converts date correctly when type is long', () => {
    expect(formatDate(date)).toBe('2022년 4월 26일 15:23');
  });

  it('converts date correctly when type is short', () => {
    expect(formatDate(date, { type: 'short' })).toBe('2022.4.26 15:23');
  });
});
