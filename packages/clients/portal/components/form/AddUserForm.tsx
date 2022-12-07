import React, { useState } from 'react';

import { Title } from '../title/Title';
import { Button } from '../buttons/Button';
import {
  checkValidateName,
  checkValidateSurname,
  checkValidateEmail,
} from '../../helpers/utils/validatiors';

import { departmentList, roleList } from './FormOptions';

export const AddUserForm = ({ onSubmit }) => {
  const [errors, setErrors] = useState([]);

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
      className="inline-block w-550 max-w-full"
      onSubmit={(e) => {
        e.preventDefault();

        const form: HTMLFormElement = e.currentTarget;

        if (errors?.length) return;
        if (!form.Role.value || form.Role.value === 'Role') {
          return setErrors([{ message: 'Select from Role list' }]);
        }
        if (form.Department.value === 'Department' || form.Department.value === '') {
          return setErrors([{ message: 'Select from Department list' }]);
        }

        if (
          !form?.FirstName?.value?.trim()?.length ||
          !form?.LastName?.value?.trim()?.length
        ) {
          return setErrors([
            {
              message: 'Check if the fields are filled in correctly',
            },
          ]);
        }
        setErrors([]);
        const newName = `${form.FirstName.value.trim()} ${form.LastName.value.trim()}`;
        onSubmit({
          name: newName,
          email: form.Email.value,
          role: form.Role.value,
          department: form.Department.value,
        });
      }}
      onChange={handelChange}
    >
      <div className="shadow-xl bg-white border border-black border-opacity-5 text-center  px-8 py-4 lg:px-16 lg:py-10">
        <Title size="lg">Add User</Title>
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-4  my-8 lg:my-16">
          <div>
            <input
              required
              type="text"
              name="FirstName"
              placeholder="First name *"
              className="border bg-white border-indigo-50 placeholder-indigo-300 md:text-base w-full"
            />
          </div>
          <div>
            <input
              required
              type="text"
              name="LastName"
              placeholder="Last name *"
              className="border bg-white border-indigo-50 placeholder-indigo-300 md:text-base w-full"
            />
          </div>
          <div>
            <input
              required
              type="email"
              name="Email"
              placeholder="E-mail *"
              className="border bg-white border-indigo-50 placeholder-indigo-300 md:text-base w-full"
            />
          </div>
          <div>
            <select
              name="Role"
              id="role"
              className="border bg-white border-indigo-50 placeholder-indigo-300 md:text-base w-full"
              onChange={() => setErrors([])}
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
              className="border bg-white border-indigo-50 placeholder-indigo-300 md:text-base w-full"
              onChange={() => setErrors([])}
            >
              <option>Department</option>
              {departmentList?.map((dept, i) => (
                <option key={i}>{dept}</option>
              ))}
            </select>
          </div>
          {!!errors?.length && (
            <div className="absolute -bottom-6 md:-bottom-8 inset-x-0">
              <p className="text-red-400 text-md text-center lg:col-span-2">
                {errors[0].message}
              </p>
            </div>
          )}
        </div>
        <Button
          label="Add"
          theme="lightindigo"
          iconPosition="before"
          as="submit"
          size="sm"
          stretch
        />
      </div>
    </form>
  );
};

export const AddUserFormMemo = React.memo(AddUserForm);
