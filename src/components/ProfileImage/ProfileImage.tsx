import classNames from 'classnames';
import { Person } from 'icons';
import Image from 'next/image';
import styles from './ProfileImage.module.scss';

interface ProfileImageProps {
  imgUrl: string | null;
  size: number;
  shape?: 'circle' | 'rectangle';
}

function ProfileImage({ imgUrl, size, shape = 'circle' }: ProfileImageProps) {
  return (
    <div data-testid="profile-image">
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
    </div>
  );
}

export default ProfileImage;
