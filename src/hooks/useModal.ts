import { useEffect, useState } from 'react';

function useModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (isModalOpen && event.key === 'Escape') {
        setIsModalOpen(false);
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [isModalOpen]);

  return {
    isModalOpen,
    openModal: () => setIsModalOpen(true),
    closeModal: () => setIsModalOpen(false),
  };
}

export default useModal;
