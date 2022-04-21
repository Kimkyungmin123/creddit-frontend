import formatDate from 'utils/formatDate';

describe('formatDate', () => {
  const date = '2020-12-29 13:10:40';
  beforeAll(() => {});

  it('converts date correctly when type is desktop', () => {
    expect(formatDate(date)).toBe('2020년 12월 29일 13:10');
  });

  it('converts date correctly when type is mobile', () => {
    expect(formatDate(date, { type: 'mobile' })).toBe('2020.12.29 13:10');
  });
});
