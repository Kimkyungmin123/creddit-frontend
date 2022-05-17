import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useUser } from 'slices/userSlice';

interface Options {
  to: string;
}

function useLogoutRedirect({ to }: Options) {
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.replace(to);
  }, [to, user, router]);
}

export default useLogoutRedirect;
