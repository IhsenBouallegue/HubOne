"use client";

import { showNotification } from "@mantine/notifications";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const API_URL = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL || ""}/api/`;

async function simpleFetchByHubId<T>(
  QUERY_NAME: string,
  hubId: number
): Promise<T[]> {
  const res = await fetch(`${API_URL}${QUERY_NAME}?hubId=${hubId}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    const { error } = await res.json();
    throw new Error(error);
  }
  return res.json();
}

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
    async () => {
      const res = await fetch(`${API_URL}${QUERY_NAME}/${itemId}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error);
      }
      return res.json();
    },
    {
      ...config,
      onError: () => {
        showNotification({
          message: `We couldn't fetch your ${QUERY_NAME.slice(0, -1)} 😢`,
          color: "red",
        });
      },
    }
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
    async (newItem: T) => {
      const res = await fetch(API_URL + QUERY_NAME, {
        method: "POST",
        body: JSON.stringify(newItem),
      });
      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error);
      }
      return res.json();
    },
    {
      // onMutate: defaultMutateList<T>(queryClient, QUERY_NAME),
      // onError: (_, __, context) => {
      onError: (error: { message: string }) => {
        // queryClient.setQueryData([QUERY_NAME], context?.previousItems);
        showNotification({
          title: `We couldn't create your ${QUERY_NAME.slice(0, -1)} 😢`,
          message: error.message,
          color: "red",
        });
      },
      onSuccess: () => {
        showNotification({
          message: `Your new ${QUERY_NAME.slice(0, -1)} has been created! 🥳`,
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
    (newItem: T) =>
      fetch(`${API_URL}${QUERY_NAME}/${newItem.id}`, {
        method: "PATCH",
        body: JSON.stringify(newItem),
      }),
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
      fetch(`${API_URL}${QUERY_NAME}/${itemId}`, {
        method: "DELETE",
      }),
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
  const { mutate } = useMutation(
    () => fetch(API_URL + QUERY_NAME, { method: "DELETE" }),
    {
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
    }
  );
  return mutate;
}
