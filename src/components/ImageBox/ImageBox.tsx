import Button from 'components/Button';
import DeleteModal from 'components/DeleteModal';
import useModal from 'hooks/useModal';
import profile from 'images/profileImg.png';
import Image from 'next/image';
import { useRef } from 'react';
import { mutate } from 'swr';
import { MyImage } from 'types';
import editProfile from 'utils/editProfile';
import styles from './ImageBox.module.scss';

export type ImageBoxProps = {
  image: MyImage;
  introduction: string;
};

function ImageBox({ image, introduction }: ImageBoxProps) {
  const { imgUrl } = image;
  const inputRef = useRef<HTMLInputElement>(null);
  const { isModalOpen, openModal, closeModal } = useModal();

  return (
    <div className={styles.imageBox} data-testid="image-box">
      <div className={styles.profileImage}>
        <Image
          src={imgUrl || profile}
          alt="프로필 이미지"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className={styles.buttons}>
        <input
          type="file"
          ref={inputRef}
          hidden
          onChange={async (event) => {
            if (event.target.files) {
              await editProfile({
                introduction,
                imageFile: event.target.files[0],
              });
            }
            await mutate('/profile/show');
          }}
        />
        <Button
          ariaLabel="프로필 이미지 업로드"
          onClick={() => inputRef.current?.click()}
        >
          이미지 업로드
        </Button>
        {imgUrl && (
          <Button
            variant="plain"
            ariaLabel="프로필 이미지 제거"
            onClick={openModal}
          >
            제거
          </Button>
        )}
        {isModalOpen && (
          <DeleteModal
            title="이미지 삭제"
            message={'정말 이미지를 삭제하시겠습니까?'}
            onConfirm={async () => {
              await editProfile({ introduction });
              closeModal();
              await mutate('/profile/show');
            }}
            onCancel={closeModal}
          />
        )}
      </div>
    </div>
  );
}

export default ImageBox;
