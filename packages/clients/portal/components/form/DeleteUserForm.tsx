import React from 'react';

import { Title } from '../title/Title';
import { Button } from '../buttons/Button';

export const DeleteUserForm = ({ setIsModuleOpen, activeUser, onSubmit }) => {
  return (
    <form
      className="inline-block lg:w-[45vw]"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({ id: activeUser });
      }}
    >
      <div className="shadow-xl bg-white border border-black border-opacity-5 text-center px-8 py-4 lg:px-16 lg:py-10">
        <Title size="lg">Delete User</Title>
        <p className="my-10 text-left font-normal leading-8">
          Permanenly delete this user? This can’t undo this.
        </p>
        <div className="flex flex-rows gap-6 content-center">
          <Button
            label="Cancel"
            onClick={() => setIsModuleOpen(false)}
            theme="lightindigo"
            as="button"
            size="sm"
            stretch
          />
          <Button label="Delete" theme="lightindigo" as="submit" size="sm" stretch />
        </div>
      </div>
    </form>
  );
};

export const DeleteUserFormMemo = React.memo(DeleteUserForm);
