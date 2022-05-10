import dayjs from 'dayjs';

export interface ChatMsg {
  sender: string;
  receiver: string;
  message: string;
  createdDate: Date;
}
export default function makeSection<T extends ChatMsg>(chatList: T[]) {
  const sections: { [key: string]: T[] } = {};
  dayjs.locale('ko');
  chatList.forEach((chat) => {
    const monthDate = dayjs(chat.createdDate).format('YYYY년 MM월 DD일 dddd');
    if (Array.isArray(sections[monthDate])) {
      sections[monthDate].push(chat);
    } else {
      sections[monthDate] = [chat];
    }
  });
  return sections;
}
