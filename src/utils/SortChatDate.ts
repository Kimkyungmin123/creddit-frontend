const SortChatDate = (
  firstMessageData: string | undefined,
  secondMessageData: string | undefined
) => {
  if (firstMessageData && secondMessageData) {
    const firstDateYear = parseInt(firstMessageData?.[0]);
    const secondDateYear = parseInt(secondMessageData?.[0]);
    const firstDateMonth = parseInt(firstMessageData?.[1]);
    const secondDateMonth = parseInt(secondMessageData?.[1]);
    const firstDateDay = parseInt(firstMessageData?.[2]);
    const secondDateDay = parseInt(secondMessageData?.[2]);
    const firstDateHour = parseInt(firstMessageData?.[3]);
    const secondDateHour = parseInt(secondMessageData?.[3]);
    const firstDateMinute = parseInt(firstMessageData?.[4]);
    const secondDateMinute = parseInt(secondMessageData?.[4]);
    const firstDateSecond = parseInt(firstMessageData?.[5]);
    const secondDateSecond = parseInt(secondMessageData?.[5]);

    if (firstDateYear === secondDateYear) {
      if (firstDateMonth === secondDateMonth) {
        if (firstDateDay === secondDateDay) {
          if (firstDateHour === secondDateHour) {
            if (firstDateSecond === secondDateSecond) {
              return secondDateSecond - firstDateSecond;
            }
            return secondDateMinute - firstDateMinute;
          }
          return secondDateHour - firstDateHour;
        }
        return secondDateDay - firstDateDay;
      }
      return secondDateMonth - firstDateMonth;
    }
    return secondDateYear - firstDateYear;
  }
};

export default SortChatDate;
