import { useMsal } from '@azure/msal-react';
import React from 'react';
import Cookies from 'js-cookie';

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
  const router = useRouter()
  const { accounts } = useMsal();
  const storadgeKey = accounts[0] ? `${accounts[0].homeAccountId}-${accounts[0].environment}-idtoken-${accounts[0].idTokenClaims['aud']}-${accounts[0].tenantId}---` : null;
  // const token = accounts[0] ? JSON.parse(sessionStorage.getItem(storadgeKey)).secret : Cookies.get('download-token');
  // this is the test token, use token defined on 30 str
  const token = 'eyJhbGciOiJFUzUxMiIsImp3ayI6eyJrdHkiOiJFQyIsImNydiI6IlAtNTIxIiwieCI6IkFZeWFIeUZGejBjYmhkVDZHbHpjazNTVkYwLXpVM1AzdGNkM3RGdnFMUUF0eHZBWGU0eGlGWUVvbTFyWGNDQkZLLTdNUlJ6ZERlYkJ3QXNzMHVzZmg4SHEiLCJ5IjoiQVk0N1F6OWVGNWpSNXVqRU94YXUzcnFzR2dtSUcyZ0d2eHR1OU1uSl9uLWxxSzNlU2lGclNsdTJMVUR6bjVhOGpRVU8wQ2pyb3lQYVJNTW9QdUlzS3ZfNyJ9fQ.eyJleHAiOjE2NTY1NzM5NDYsImh0dHA6Ly9saWNlbnNlLW1hbmFnZXIuaGFybW9uLmllL2FsbC9yZWFkP2RvbWFpbnM9aGFybW9uLmllIjp0cnVlLCJwcm92aWRlciI6InplbmRlc2siLCJ1aWQiOiIzOTIyNzEyNTA2NzEiLCJ1c2VybmFtZSI6InZhZGltIChtYWluc29mdCkifQ.AJGNuG3V552904P8XEEzAvmXJin6i2pbz2VIZi-qnYNdoxvIKrtQJOblCFkocuK6AszPtU-wXM5k8GVpqb2wNp1qACEi5oCaBRG9xbpHsJI9ll7hIqny8iqZ5Tqlh_GezlRNMlldARoXxnyJ3AZfoYiaPY4Wboja8kNrcJKoLkq-S-Ba'
  
  const deleteUser = async ({ emails }) => {
    try {
      const response = await fetch(
        `${process.env.API_URL}/remove`,
        {
          body: JSON.stringify({
            "": emails
          }),
          method: 'POST',
          headers: {
            authorization:
              `Bearer ${token}`,
          },
        },
      );
      if (response.status === 200) {
        router.reload()
      }
      setIsModuleOpen(false)
    } catch (err) {
      console.log(err)
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
