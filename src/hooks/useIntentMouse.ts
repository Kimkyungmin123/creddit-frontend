import { useEffect } from 'react';

const CLASS_NAME = 'intent-mouse';

/**
 * 마우스 클릭 여부에 따라 outline을 다르게 설정하기 위해 사용하는 함수
 */
function useIntentMouse() {
  useEffect(() => {
    const addClass = (event: MouseEvent) => {
      // 키보드로 엘리먼트를 클릭하면 screenX와 screenY가 0임을 이용
      if (event.screenX !== 0 && event.screenY !== 0) {
        document.body.classList.add(CLASS_NAME);
      } else {
        removeIntentMouse();
      }
    };
    window.addEventListener('click', addClass);
    return () => window.removeEventListener('click', addClass);
  }, []);

  useEffect(() => {
    const removeClass = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;
      removeIntentMouse();
    };
    window.addEventListener('keydown', removeClass);
    return () => window.removeEventListener('keydown', removeClass);
  }, []);
}

export function removeIntentMouse() {
  return document.body.classList.remove(CLASS_NAME);
}

export default useIntentMouse;
