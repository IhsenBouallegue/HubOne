/* eslint-disable sonarjs/no-duplicate-string */
import type { QueryClient } from "@tanstack/react-query";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import axios from "./axios";

export const simpleFetchByHubId = <T>(
  QUERY_NAME: string,
  hubId: number
): Promise<T[]> => {
  return axios
    .get<T[]>(`${QUERY_NAME}?hubId=${hubId}`)
    .then(({ data }) => data as T[]);
};

export function useFetchByHubId<T>(
  QUERY_NAME: string,
  hubId: number,
  config?: { enabled: boolean; onSuccess: (data: T[]) => void }
) {
  return useQuery<T[]>(
    [QUERY_NAME, hubId],
    () => simpleFetchByHubId<T>(QUERY_NAME, hubId),
    config
  );
}

export function useFetchItem<T>(
  QUERY_NAME: string,
  itemId: number,
  config?: { onSuccess: (data: T) => void }
) {
  return useQuery<T>(
    [QUERY_NAME],
    () => axios.get<T>(`${QUERY_NAME}/${itemId}`).then(({ data }) => data as T),
    config
  );
}

const defaultSuccess = (queryClient: QueryClient, QUERY_NAME: string) => {
  return () => {
    setTimeout(() => {
      queryClient.invalidateQueries([QUERY_NAME]);
    }, 300);
  };
};

export function usePost<T>(QUERY_NAME: string) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    (newItem: T) => {
      return axios.post<T>(QUERY_NAME, newItem);
    },
    {
      onSuccess: defaultSuccess(queryClient, QUERY_NAME),
      onError: () => {
        // TODO: handle errors
      },
    }
  );
  return mutate;
}

export function useUpdate<T>(QUERY_NAME: string) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    ({ newItem, itemID }: { newItem: T; itemID: number }) => {
      return axios.patch<T>(`${QUERY_NAME}/${itemID}`, {
        ...newItem,
      });
    },
    {
      onSuccess: defaultSuccess(queryClient, QUERY_NAME),
      onError: () => {
        // TODO: handle errors
      },
    }
  );
  return mutate;
}

export function useDelete(QUERY_NAME: string) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    (itemID: number) => {
      return axios.delete(`${QUERY_NAME}/${itemID}`, { data: { itemID } });
    },
    {
      onSuccess: defaultSuccess(queryClient, QUERY_NAME),
      onError: () => {
        // TODO: handle errors
      },
    }
  );
  return mutate;
}

export function useDeleteAll(QUERY_NAME: string) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    () => {
      return axios.delete(QUERY_NAME);
    },
    {
      onSuccess: defaultSuccess(queryClient, QUERY_NAME),
      onError: () => {
        // TODO: handle errors
      },
    }
  );
  return mutate;
}
