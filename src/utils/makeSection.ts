import { Message } from 'types';

// 수정예정
export default function makeSectionMessage(chatList: Message[]) {
  const daySection = `${new Date().getFullYear()}년 ${new Date().getMonth()}월 ${new Date().getDate()}일 ${new Date().getDay()}요일 `;
  const sections: { [key: string]: Message[] } = {};

  chatList.forEach((chat) => {
    if (Array.isArray(sections[daySection])) {
      sections[daySection].push(chat);
    } else {
      sections[daySection] = [chat];
    }
  });
  return sections;
}
