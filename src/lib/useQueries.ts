import { showNotification } from "@mantine/notifications";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import axios from "./axios";

const simpleFetchByHubId = <T>(
  QUERY_NAME: string,
  hubId: number
): Promise<T[]> =>
  axios
    .get<T[]>(`${QUERY_NAME}?hubId=${hubId}`)
    .then(({ data }) => data as T[]);

export function useFetchByHubId<T>(
  QUERY_NAME: string,
  hubId: number,
  config?: Partial<{
    enabled: boolean;
    onSuccess: (data: T[]) => void;
    initialData: T[];
  }>
) {
  return useQuery<T[]>(
    [QUERY_NAME],
    () => simpleFetchByHubId<T>(QUERY_NAME, hubId),
    config
  );
}

export function useFetchItem<T>(
  QUERY_NAME: string,
  itemId: number,
  config?: Partial<{ onSuccess: (data: T) => void; initialData: T }>
) {
  return useQuery<T>(
    [QUERY_NAME],
    () => axios.get<T>(`${QUERY_NAME}/${itemId}`).then(({ data }) => data as T),
    config
  );
}

// const defaultMutateList =
//   <T>(queryClient: QueryClient, QUERY_NAME: string) =>
//   async (newItem: T) => {
//     // Optimistic list update
//     await queryClient.cancelQueries([QUERY_NAME]);
//     const previousItems = queryClient.getQueryData([QUERY_NAME]);
//     queryClient.setQueryData([QUERY_NAME], (old) => [old, newItem]);
//     return { previousItems };
//   };

// const defaultMutateItem =
//   <T extends { id: number }>(queryClient: QueryClient, QUERY_NAME: string) =>
//   async (newItem: T) => {
//     // Optimistic single item update
//     await queryClient.cancelQueries([QUERY_NAME, newItem.id]);
//     const previousItem = queryClient.getQueryData([QUERY_NAME, newItem.id]);
//     queryClient.setQueryData([QUERY_NAME, newItem.id], newItem);
//     return { previousItem, newItem };
//   };

export function usePost<T>(QUERY_NAME: string) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    (newItem: T) => axios.post<T>(QUERY_NAME, newItem),
    {
      // onMutate: defaultMutateList<T>(queryClient, QUERY_NAME),
      // onError: (_, __, context) => {
      onError: () => {
        // queryClient.setQueryData([QUERY_NAME], context?.previousItems);
        showNotification({
          message: `We couldn't add your ${QUERY_NAME.slice(0, -1)} 😢`,
          color: "red",
        });
      },
      onSuccess: () => {
        showNotification({
          message: `Your new ${QUERY_NAME.slice(0, -1)} has been added! 🥳`,
        });
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
    (newItem: T) => axios.patch<T>(`${QUERY_NAME}/${newItem.id}`, newItem),
    {
      // onMutate: defaultMutateItem<T>(queryClient, QUERY_NAME),
      // onError: (_, __, context) => {
      onError: () => {
        // queryClient.setQueryData([QUERY_NAME], context?.previousItem);
        showNotification({
          message: `We couldn't update your ${QUERY_NAME.slice(0, -1)} 😢`,
          color: "red",
        });
      },
      onSuccess: () => {
        showNotification({
          message: `Your ${QUERY_NAME.slice(0, -1)} has been updated! 🥳`,
        });
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
    (itemId: number) =>
      axios.delete(`${QUERY_NAME}/${itemId}`, { data: { itemId } }),
    {
      onError: () => {
        showNotification({
          message: `The ${QUERY_NAME.slice(0, -1)} couldn't be deleted! 😢`,
          color: "red",
        });
      },
      onSuccess: () => {
        showNotification({
          message: `The ${QUERY_NAME.slice(0, -1)} has been deleted❗`,
        });
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
  const { mutate } = useMutation(() => axios.delete(QUERY_NAME), {
    onError: () => {
      showNotification({
        message: `The ${QUERY_NAME} couldn't be deleted! 😢`,
        color: "red",
      });
    },
    onSuccess: () => {
      showNotification({
        message: `The ${QUERY_NAME} has been deleted❗`,
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries([QUERY_NAME]);
    },
  });
  return mutate;
}
