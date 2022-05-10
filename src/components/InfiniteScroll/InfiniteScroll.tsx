import { useEffect, useRef, useState } from 'react';

type Props = {
  size: number;
  onIntersect: () => Promise<any[]>;
  data?: any[] | null;
};

function InfiniteScroll({ data, size, onIntersect }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [prevData, setPrevData] = useState<any[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isLoading) return;
    // 첫 요청 시 데이터 개수가 size 이하이면 요청 중단
    if (data && data.length < size) return;
    // 끝에 도달하면 요청 중단
    if (data && prevData && prevData.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(async (entry) => {
          if (entry.isIntersecting) {
            setIsLoading(true);
            const data = await onIntersect();
            setPrevData(data);
            setIsLoading(false);
          }
        });
      },
      { rootMargin: '300px' }
    );

    const { current } = ref;
    if (current) observer.observe(current);
    return () => {
      if (current) observer.unobserve(current);
    };
  }, [onIntersect, isLoading, data, prevData, size]);

  return <div ref={ref}></div>;
}

export default InfiniteScroll;
