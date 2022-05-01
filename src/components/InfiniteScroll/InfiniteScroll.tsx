import { useEffect, useRef, useState } from 'react';

type Props = {
  onIntersect: () => Promise<any[]>;
};

function InfiniteScroll({ onIntersect }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (finished) return;

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
  }, [onIntersect, finished]);

  return <div ref={ref}></div>;
}

export default InfiniteScroll;
