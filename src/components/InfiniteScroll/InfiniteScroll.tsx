import { useEffect, useRef, useState } from 'react';

type Props = {
  size: number;
  onIntersect: () => Promise<any[]>;
  data?: any[] | null;
};

function InfiniteScroll({ data, size, onIntersect }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [prevData, setPrevData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isLoading || (data && prevData.length < size)) return;

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
