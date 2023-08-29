import api from '@/@core/api';
import {
  CustomerUserGroup,
  useAuthStore,
  useCustomerSearchStore,
  useDashboardStore
} from '@/@core/store';
import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

export function DashboardProvider() {
  const { setAccountOfficers } = useCustomerSearchStore((state) => state);
  const { setMyGroupTasksData, setAllRequestsData, setTasksWithRequestData } =
    useDashboardStore((state) => state);
  const { userData } = useAuthStore((state) => state);

  const { mutateAsync: getGroupTaskByUser } = useMutation(
    ['getGroupTaskByUserRequest'],
    async (params: string) =>
      <AxiosResponse<any>>(
        await api.get(`case-management/v1/searchcase?${params}`)
      ),
    {
      onSuccess: (response) => {
        setMyGroupTasksData(response?.data);
      },
      onError(error, variables, context) {
        console.log(
          'Error on get getGroupTaskByUserRequest',
          error,
          variables,
          context
        );
      }
    }
  );

  const { mutateAsync: getAllRequestTab } = useMutation(
    ['getAllRequestTabRequest'],
    async () =>
      <AxiosResponse<any>>(
        await api.get(
          `case-management/v1/searchcase?UserOwner=${userData.userName?.toLowerCase()}&Status=1&TypeRequest=2`
        )
      ),
    {
      onSuccess: (response) => {
        setAllRequestsData(response.data);
      },
      onError(error, variables, context) {
        console.log(
          'Error on get ggetAllRequestTabRequest',
          error,
          variables,
          context
        );
      }
    }
  );

  const { mutateAsync: getDashboardWithParams } = useMutation(
    ['getDashboardWithParamsRequest'],
    async (params: string) =>
      <AxiosResponse<any>>(
        await api.get(`case-management/v1/searchcase?${params}`)
      ),
    {
      onSuccess: (response) => {
        setTasksWithRequestData(response?.data);
      },
      onError(error, variables, context) {
        console.log(
          'Error on get getGroupTaskByUserRequest',
          error,
          variables,
          context
        );
      }
    }
  );

  const { mutateAsync: findGroupByUser } = useMutation(
    ['findGroupByUserRequest'],
    async () =>
      <AxiosResponse<CustomerUserGroup>>(
        await api.get(`/customer/v1/findgroupsuserbyuser/${userData.userName}`)
      ),
    {
      onSuccess: (response) => {
        let data = response.data.data.userGroup.map((item: any) => {
          item.text = item.userName;
          item.value = item.userId;
          item.isPartOfGroup = item.isPartOfGroup;
          return item;
        });
        setAccountOfficers(data);
      },
      onError(error, variables, context) {
        console.log(
          'Error on get findGroupByUserRequest',
          error,
          variables,
          context
        );
      }
    }
  );

  return {
    getGroupTaskByUser, // Buscar Fee por CIF
    findGroupByUser,
    getAllRequestTab,
    getDashboardWithParams
  };
}
