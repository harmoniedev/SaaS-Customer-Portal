import { useMsal } from '@azure/msal-react';
import React from 'react';

import { DeleteUserFormMemo as DeleteUserForm } from '../components/form/DeleteUserForm';
import { DeleteUsersForm as DeleteUsersForm } from '../components/form/DeleteUsersForm';
import { useRouter } from 'next/router';

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
  activeUser,
  checkedUsersList,
  isCheckAll,
}: OpenFormSceneProps) => {
  const router = useRouter();
  const { accounts } = useMsal();
  const storadgeKey = accounts[0]
    ? `${accounts[0].homeAccountId}-${accounts[0].environment}-idtoken-${accounts[0].idTokenClaims['aud']}-${accounts[0].tenantId}---`
    : null;
  // const token = accounts[0] ? JSON.parse(sessionStorage.getItem(storadgeKey)).secret : Cookies.get('download-token');
  // this is the test token, use token defined on 30 str
  const token = process.env.TEMP_TOKEN;
  
  const deleteUser = async ({ emails }) => {
    try {
      const response = await fetch(`${process.env.API_URL}/remove`, {
        body: JSON.stringify({
          '': emails,
        }),
        method: 'POST',
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        router.reload();
      }
      setIsModuleOpen(false);
    } catch (err) {
      console.log(err);
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
