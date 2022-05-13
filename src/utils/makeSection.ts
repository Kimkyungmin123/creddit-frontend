import { Message } from 'types';
// import { chatdate } from 'utils/chatdate';

export default function makeSectionMessage(chatList: Message[]) {
  const sections: { [key: string]: Message[] } = {};

  chatList.forEach((chat) => {
    const day = `${new Date().getFullYear()}년 ${new Date().getMonth()}월 ${new Date().getDate()}일 ${new Date().getDay()}요일 `;
    if (Array.isArray(sections[day])) {
      sections[day].push(chat);
    } else {
      sections[day] = [chat];
    }
  });
  return sections;
}
