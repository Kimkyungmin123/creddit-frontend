import classNames from 'classnames';
import { Person } from 'icons';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';
import styles from './ProfileImage.module.scss';

interface ProfileImageProps {
  imgUrl: string | null;
  size: number;
  nickname?: string;
  shape?: 'circle' | 'rectangle';
}

function ProfileImage({
  imgUrl,
  size,
  nickname,
  shape = 'circle',
}: ProfileImageProps) {
  return (
    <Container nickname={nickname}>
      <div
        className={classNames(styles.container, styles[shape])}
        style={{ width: `${size}rem`, height: `${size}rem` }}
      >
        {imgUrl ? (
          <Image
            src={imgUrl}
            alt="사용자 프로필 이미지"
            layout="fill"
            objectFit="cover"
          />
        ) : (
          <div className={styles.emptyImage}>
            <Person style={{ width: `${size}rem`, height: `${size}rem` }} />
          </div>
        )}
      </div>
    </Container>
  );
}

interface ContainerProps {
  children: ReactNode;
  nickname?: string;
}

function Container({ children, nickname }: ContainerProps) {
  return (
    <>
      {nickname ? (
        <Link href={`/profile/${nickname}`}>
          <a data-testid="profile-image">{children}</a>
        </Link>
      ) : (
        <div data-testid="profile-image">{children}</div>
      )}
    </>
  );
}

export default ProfileImage;
