/* eslint-disable sonarjs/no-duplicate-string */
import type { QueryClient } from "@tanstack/react-query";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import axios from "./axios";

const simpleFetchByHubId = <T>(
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

const defaultMutateList = <T>(queryClient: QueryClient, QUERY_NAME: string) => {
  return async (newItem: T) => {
    // Optimistic list update
    await queryClient.cancelQueries([QUERY_NAME]);
    const previousItems = queryClient.getQueryData([QUERY_NAME]);
    queryClient.setQueryData([QUERY_NAME], (old) => [old, newItem]);
    return { previousItems };
  };
};

const defaultMutateItem = <T extends { id: number }>(
  queryClient: QueryClient,
  QUERY_NAME: string
) => {
  return async ({ id, ...newItem }: T) => {
    // Optimistic single item update
    await queryClient.cancelQueries([QUERY_NAME, id]);
    const previousItem = queryClient.getQueryData([QUERY_NAME, id]);
    queryClient.setQueryData([QUERY_NAME, id], newItem);
    return { previousItem, newItem };
  };
};

export function usePost<T>(QUERY_NAME: string) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    (newItem: T) => {
      return axios.post<T>(QUERY_NAME, newItem);
    },
    {
      onMutate: defaultMutateList<T>(queryClient, QUERY_NAME),
      onError: (_, __, context) => {
        queryClient.setQueryData([QUERY_NAME], context?.previousItems);
      },
      onSettled: () => {
        queryClient.invalidateQueries([QUERY_NAME]);
      },
    }
  );
  return mutate;
}

export function useUpdate<T extends { id: number }>(QUERY_NAME: string) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    ({ id, ...newItem }: T) => {
      return axios.patch<T>(`${QUERY_NAME}/${id}`, newItem);
    },
    {
      onMutate: defaultMutateItem<T>(queryClient, QUERY_NAME),
      onError: (_, __, context) => {
        queryClient.setQueryData([QUERY_NAME], context?.previousItem);
      },
      onSettled: () => {
        queryClient.invalidateQueries([QUERY_NAME]);
      },
    }
  );
  return mutate;
}

export function useDelete(QUERY_NAME: string) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    (itemId: number) => {
      return axios.delete(`${QUERY_NAME}/${itemId}`, { data: { itemId } });
    },
    {
      onError: () => {
        // TODO: handle errors
      },
      onSettled: () => {
        queryClient.invalidateQueries([QUERY_NAME]);
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
      onError: () => {
        // TODO: handle errors
      },
      onSettled: () => {
        queryClient.invalidateQueries([QUERY_NAME]);
      },
    }
  );
  return mutate;
}
