import ERRORS from 'constants/errors';
import { ChangeEvent, useState } from 'react';
import isDuplicate from 'utils/isDuplicate';
import useDebounce from './useDebounce';

type Type = 'email' | 'nickname';

function useDuplicateError(type: Type) {
  const [error, setError] = useState<string | null>(null);
  const debounce = useDebounce();

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setError(null);
    debounce(() => {
      const { value } = event.target;
      if (value) {
        isDuplicate(type, value).then((duplicate) => {
          if (duplicate) setError(ERRORS[`${type}Duplicate`]);
        });
      }
    }, 200);
  };

  return {
    error,
    onChange,
  };
}

export default useDuplicateError;
