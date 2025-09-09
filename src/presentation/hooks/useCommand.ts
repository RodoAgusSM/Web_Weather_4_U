import { useCallback, useState } from 'react';

import { ICommand } from '../../application/commands/ICommand';
import { Result } from '../../shared/result/Result';

export interface UseCommandState<T> {
  loading: boolean;
  result: Result<T, Error> | null;
  error: Error | null;
  data: T | null;
}

export const useCommand = <T>() => {
  const [state, setState] = useState<UseCommandState<T>>({
    loading: false,
    result: null,
    error: null,
    data: null,
  });

  const execute = useCallback(async (command: ICommand<T>) => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const data = await command.execute();
      const result = Result.ok<T, Error>(data);

      setState({
        loading: false,
        result,
        error: null,
        data,
      });

      return result;
    } catch (error) {
      const errorResult = Result.err<T, Error>(error as Error);

      setState({
        loading: false,
        result: errorResult,
        error: error as Error,
        data: null,
      });

      return errorResult;
    }
  }, []);

  const reset = useCallback(() => {
    setState({
      loading: false,
      result: null,
      error: null,
      data: null,
    });
  }, []);

  return {
    ...state,
    execute,
    reset,
    isSuccess: state.result?.isOk() ?? false,
    isError: state.result?.isErr() ?? false,
  };
};
