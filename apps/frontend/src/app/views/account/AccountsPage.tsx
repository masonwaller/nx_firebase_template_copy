import React, { useEffect, useState } from 'react';
import { UserContext } from '../../app';
import { Settings } from './Settings';
import { FormSaveButton } from '../../components/formSaveButton/FormSaveButton';
import { isFormValid } from '../../shared/validation';
import { initYourAccountValidationState } from './validation';
import { updateUserData } from '../../api-client/apiModules/users';
import { Login } from '../login/Login';

export const AccountPage = () => {
    const {user, setUser} = React.useContext(UserContext);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        userType: '',
    });
    const [submittingForm, setSubmittingForm] = useState(false);
    
    const initialFormValidationState = initYourAccountValidationState();
    const [validation, setValidation] = useState(initialFormValidationState);

    useEffect(() => {
        if (user.id) {
            setFormData({
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                userType: user.userType|| '',
            });
        }
    }, [user]);


    const updateFormData = (data: Record<string, any>) => {
        setFormData({ ...formData, ...data });
      };

    const handleInputChange = (e: React.ChangeEvent<HTMLFormElement>) => {
        const { name, value } = e.target;

        updateFormData({ [name]: value });
      };

    const onSubmit = async () => {
        setSubmittingForm(true);
        setValidation(initYourAccountValidationState());

        try {
            const response = await updateUserData(formData);
            if (!response.success) {
                alert('There was an error updating your account.');
            } else {
                alert('Your account has been updated.');
            }
        } catch (e) {
          console.error('Error submitting form', e);
          alert('There was an error.');
        } finally {
          setSubmittingForm(false);
        }
      };


    return (
        <div className="bg-gray-200">
          <div className="container mx-auto w-7/12 px-4 sm:px-6 lg:px-8">
            {!user.id ? (
                <Login />
            ) : (
            <>
              <h2 className="text-gray-700 font-bold text-4xl">
                Welcome {user.firstName} {user.lastName} to your account page{' '}
              </h2>
            <section
              className="divide-y divide-gray-200"
              onChange={handleInputChange}
            >
              <Settings
                formData={formData}
                userEmail={user.email || ''}
                updateFormData={updateFormData}
              />
              <FormSaveButton
                submittingForm={submittingForm}
                formIsValid={!!isFormValid(validation)}
                onClick={onSubmit}
              />
            </section>
            </>
            )}
          </div>
        </div>
      );
}