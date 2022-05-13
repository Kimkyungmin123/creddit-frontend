export const chatDate = new Date();

// 안되면 지우기
const year = chatDate.getFullYear(); // 년도
const month = chatDate.getMonth() + 1; // 월
const date = chatDate.getDate(); // 날짜
const day = chatDate.getDay(); // 요일
const hours = ('0' + chatDate.getHours()).slice(-2);
const minutes = ('0' + chatDate.getMinutes()).slice(-2);

export const time = `${hours}:${minutes}`;
export const chatdate = `${year}년 ${month}월 ${day}일 ${date}요일 `;
