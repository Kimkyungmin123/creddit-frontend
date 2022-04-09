import type { NextApiRequest, NextApiResponse } from 'next';

// FIXME: 백엔드 유저 정보 조회 API가 만들어지면 삭제
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.headers.authorization) {
    res.status(200).json({
      user: {
        id: 'id',
        createdDate: '2020-12-29 13:10:40',
        nickname: '이름',
        introduce: '소개 글',
      },
    });
  } else {
    res.status(200).json({ message: '현재 로그인한 사용자 없음' });
  }
}
