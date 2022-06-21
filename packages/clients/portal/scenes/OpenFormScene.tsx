import { useMsal } from '@azure/msal-react';
import React from 'react';

import { DeleteUserFormMemo as DeleteUserForm } from '../components/form/DeleteUserForm';
import { DeleteUsersForm as DeleteUsersForm } from '../components/form/DeleteUsersForm';

import DataAPI from '../api/data';

const dataAPI = new DataAPI();

export type OpenFormSceneProps = {
  modalNameOpen: string;
  setIsModuleOpen: React.Dispatch<React.SetStateAction<boolean>>;
  items: any[];
  activeUser: string;
  checkedUsersList: string[];
  isCheckAll: boolean;
  setUsersList: any;
  setCheckedUsersList: any;
  token?: string;
};
export const OpenFormScene = ({
  modalNameOpen,
  setIsModuleOpen,
  items,
  activeUser,
  checkedUsersList,
  isCheckAll,
  setUsersList,
  setCheckedUsersList,
}: OpenFormSceneProps) => {
  const { accounts } = useMsal();
  const storadgeKey = `${accounts[0].homeAccountId}-${accounts[0].environment}-idtoken-${accounts[0].idTokenClaims['aud']}-${accounts[0].tenantId}---`;
  const token = JSON.parse(sessionStorage.getItem(storadgeKey)).secret;

  const deleteUser = async ({ id }) => {
    const response = await dataAPI.deleteUser({
      tid: accounts[0]?.tenantId,
      token,
      userId: id,
    });
    if (response.status === 200) {
      setCheckedUsersList([]);
      setIsModuleOpen(false);
    }
  };
  const openFormNamed = () => {
    switch (modalNameOpen) {
      case 'delete':
        return (
          <DeleteUserForm
            setIsModuleOpen={setIsModuleOpen}
            onSubmit={deleteUser}
            activeUser={activeUser}
          />
        );
      case 'deleteAll':
        return (
          <DeleteUsersForm
            checkedList={checkedUsersList}
            setIsModuleOpen={setIsModuleOpen}
            onSubmit={deleteUser}
            isCheckAll={isCheckAll}
          />
        );
      default:
        break;
    }
  };
  return openFormNamed();
};

export const OpenFormSceneMemo = React.memo(OpenFormScene);
