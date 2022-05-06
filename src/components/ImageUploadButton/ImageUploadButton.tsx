import Button from 'components/Button';
import { useRef } from 'react';

interface ImageUploadButtonProps {
  onChange: (file: File | null) => void;
  ariaLabel?: string;
}

function ImageUploadButton({ onChange, ariaLabel }: ImageUploadButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <input
        type="file"
        ref={inputRef}
        hidden
        onChange={(event) => {
          const file = event.target.files ? event.target.files[0] : null;
          onChange(file);
          event.target.value = '';
        }}
      />
      <Button
        type="button"
        ariaLabel={ariaLabel}
        onClick={() => inputRef.current?.click()}
        data-testid="image-upload-button"
      >
        이미지 업로드
      </Button>
    </>
  );
}

export default ImageUploadButton;
