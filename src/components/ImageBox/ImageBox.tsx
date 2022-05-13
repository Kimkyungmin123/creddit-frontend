import Button from 'components/Button';
import DeleteModal from 'components/DeleteModal';
import ImageUploadButton from 'components/ImageUploadButton';
import ProfileImage from 'components/ProfileImage';
import useModal from 'hooks/useModal';
import useUser from 'hooks/useUser';
import { mutate } from 'swr';
import { MyImage } from 'types';
import editProfile from 'utils/editProfile';
import styles from './ImageBox.module.scss';

export type ImageBoxProps = {
  image: MyImage;
  introduction: string;
  isAuthor: boolean;
};

function ImageBox({ image, introduction, isAuthor }: ImageBoxProps) {
  const { imgUrl } = image;
  const { isModalOpen, openModal, closeModal } = useModal();
  const { user } = useUser();

  return (
    <div className={styles.imageBox} data-testid="image-box">
      <ProfileImage imgUrl={imgUrl} shape="rectangle" size={6} />
      {isAuthor && (
        <div className={styles.buttons}>
          <ImageUploadButton
            ariaLabel={'프로필 이미지 업로드'}
            onChange={async (file) => {
              const { data } = await editProfile({
                introduction,
                imageFile: file,
              });
              const { image } = data;
              const nextUser = { ...user, image };
              mutate('/profile/show', { user: nextUser }, false);
              mutate(`/profile/show/${user?.nickname}`, { ...nextUser }, false);
            }}
          />
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
              title="이미지 제거"
              message={'정말 이미지를 제거하시겠습니까?'}
              onConfirm={async () => {
                const { data } = await editProfile({ introduction });
                const { image } = data;
                closeModal();
                const nextUser = { ...user, image };
                mutate('/profile/show', { user: nextUser }, false);
                mutate(
                  `/profile/show/${user?.nickname}`,
                  { ...nextUser },
                  false
                );
              }}
              onCancel={closeModal}
              buttonName="제거"
            />
          )}
        </div>
      )}
    </div>
  );
}

export default ImageBox;
