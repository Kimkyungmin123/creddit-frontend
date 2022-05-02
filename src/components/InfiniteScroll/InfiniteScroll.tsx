import { useEffect, useRef, useState } from 'react';

type Props = {
  data: any[];
  onIntersect: () => Promise<any[]>;
};

function InfiniteScroll({ data, onIntersect }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (data.length !== 0 && finished) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(async (entry) => {
          if (entry.isIntersecting) {
            const data = await onIntersect();
            if (data.length === 0) setFinished(true);
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
  }, [onIntersect, finished, data]);

  return <div ref={ref}></div>;
}

export default InfiniteScroll;
