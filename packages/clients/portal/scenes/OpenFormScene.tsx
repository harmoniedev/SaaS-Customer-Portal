import { useMsal } from '@azure/msal-react';
import React from 'react';

import { AddUserFormMemo as AddUserForm } from '../components/form/AddUserForm';
import { EditUserFormMemo as EditUserForm } from '../components/form/EditUserForm';
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
  getUsersData: any;
  setCheckedUsersList: any;
};
export const OpenFormScene = ({
  modalNameOpen,
  setIsModuleOpen,
  items,
  activeUser,
  checkedUsersList,
  isCheckAll,
  setUsersList,
  getUsersData,
  setCheckedUsersList,
}: OpenFormSceneProps) => {
  const { accounts } = useMsal();
  const storadgeKey = `${accounts[0].homeAccountId}-${accounts[0].environment}-idtoken-${accounts[0].idTokenClaims['aud']}-${accounts[0].tenantId}---`;
  const token = JSON.parse(sessionStorage.getItem(storadgeKey)).secret;

  const addUser = async ({ name, email, role }) => {
    const response = await dataAPI.addUser({
      tid: accounts[0]?.tenantId,
      token,
      body: {
        license: 'FREE',
        role,
        email,
        name,
      },
    });
    if (response.status === 200) {
      setUsersList([]);
      setIsModuleOpen(false);
      getUsersData();
    }
  };

  const editUser = async ({ name, email, role, id, license }) => {
    const response = await dataAPI.editUser({
      tid: accounts[0]?.tenantId,
      token,
      userId: id,
      body: {
        name,
        email,
        role,
        license,
      },
    });
    if (response.status === 200) {
      setIsModuleOpen(false);
      getUsersData();
    }
  };

  const deleteUser = async ({ id }) => {
    const response = await dataAPI.deleteUser({
      tid: accounts[0]?.tenantId,
      token,
      userId: id,
    });
    if (response.status === 200) {
      setCheckedUsersList([]);
      setIsModuleOpen(false);
      getUsersData();
    }
  };
  const openFormNamed = () => {
    switch (modalNameOpen) {
      case 'add':
        return <AddUserForm onSubmit={addUser} />;
      case 'edit':
        return (
          <EditUserForm
            setIsModuleOpen={setIsModuleOpen}
            user={items.filter((item) => item._id === activeUser)}
            onSubmit={editUser}
          />
        );
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
