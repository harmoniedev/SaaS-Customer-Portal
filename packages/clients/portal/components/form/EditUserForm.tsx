import React, { useState } from 'react';

import { Title } from '../title/Title';
import { Button } from '../buttons/Button';
import {
  checkValidateName,
  checkValidateSurname,
  checkValidateEmail,
} from '../../helpers/utils/validatiors';

import { departmentList, roleList } from './FormOptions';

export const EditUserForm = ({ setIsModuleOpen, user, onSubmit }) => {
  const [errors, setErrors] = useState([]);
  const { name, email, _id, department } = user[0];
  const newName = name.split(' ');
  const [firstName, setFirstName] = useState(name ? newName[0] : '');
  const [lastName, setLastName] = useState(name ? newName[1] : '');
  const [emailUser, setEmailUser] = useState(email ? email : '');
  const [roleUser, setRoleUser] = useState('Member');
  const [departUser, setDepartUser] = useState(
    department ? department : 'Department',
  );

  const handelChange = ({ target }) => {
    const { value, name } = target;
    switch (name) {
      case 'FirstName':
        setErrors(checkValidateName(value));
        break;
      case 'LastName':
        setErrors(checkValidateSurname(value));
        break;
      case 'Email':
        setErrors(checkValidateEmail(value));
        break;
      default:
        break;
    }
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (errors?.length) return;
        if (!form.Role.value || form.Role.value === 'Role') {
          return setErrors([{ message: 'Select from Role list' }]);
        }
        if (form.Department.value === 'Department' || form.Department.value === '') {
          return setErrors([{ message: 'Select from Department list' }]);
        }

        if (
          !form.FirstName.value.trim()?.length ||
          !form.LastName.value.trim()?.length
        ) {
          return setErrors([
            {
              message: 'Check if the fields are filled in correctly',
            },
          ]);
        }

        setErrors([]);
        onSubmit({
          name: `${form.FirstName.value.trim()} ${form.LastName.value.trim()}`,
          email: emailUser,
          role: roleUser,
          id: _id,
          department: departUser,
        });
      }}
      className="inline-block w-550 max-w-full"
      onChange={handelChange}
    >
      <div className="shadow-xl bg-white border border-black border-opacity-5 text-center px-8 py-4 lg:px-16 lg:py-10">
        <Title size="lg">Edit User</Title>
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-4 my-8 lg:my-16">
          <div>
            <input
              required
              type="text"
              name="FirstName"
              placeholder="First name *"
              className="border bg-white border-indigo-50 placeholder-indigo-300 md:text-base w-full"
              value={firstName}
              onChange={({ target }) => setFirstName(target.value)}
            />
          </div>
          <div>
            <input
              required
              type="text"
              name="LastName"
              placeholder="Last name *"
              className="border bg-white border-indigo-50 placeholder-indigo-300 md:text-base w-full"
              value={lastName}
              onChange={({ target }) => setLastName(target.value)}
            />
          </div>
          <div>
            <input
              required
              type="email"
              name="Email"
              placeholder="E-mail *"
              className="border bg-white border-indigo-50 placeholder-indigo-300 md:text-base w-full"
              value={emailUser}
              onChange={({ target }) => setEmailUser(target.value)}
            />
          </div>
          <div>
            <select
              name="Role"
              id="role"
              className="border bg-white border-indigo-50 placeholder-indigo-300 md:text-base w-full"
              value={roleUser}
              onChange={({ target }) => {
                setRoleUser(target.value);
                if (target.value !== 'Role' || target.value?.length !== 0)
                  setErrors([]);
              }}
            >
              <option>Role</option>
              {roleList?.map((role, i) => (
                <option key={i} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
          <div className="lg:col-span-2 ">
            <select
              name="Department"
              id="department"
              value={departUser}
              className="border bg-white border-indigo-50 placeholder-indigo-300 md:text-base w-full"
              onChange={({ target }) => {
                setDepartUser(target.value);
                if (target.value !== 'Department' || target.value?.length !== 0)
                  setErrors([]);
              }}
            >
              <option>Department</option>
              {departmentList?.map((dept, i) => (
                <option key={i}>{dept}</option>
              ))}
            </select>
            {!!errors?.length && (
              <div className="absolute -bottom-6 md:-bottom-8 inset-x-0">
                <p className="text-red-400 text-md text-center lg:col-span-2">
                  {errors[0].message}
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-rows gap-6 content-center">
          <Button
            label="Discard"
            onClick={() => setIsModuleOpen(false)}
            theme="lightindigo"
            as="button"
            size="sm"
            stretch
          />
          <Button label="Save" theme="lightindigo" as="submit" size="sm" stretch />
        </div>
      </div>
    </form>
  );
};

export const EditUserFormMemo = React.memo(EditUserForm);
