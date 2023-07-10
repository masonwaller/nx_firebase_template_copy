import React, { useEffect, useState } from 'react';
import { UserContext } from '../../app';
import { Settings } from './Settings';
import { FormSaveButton } from '../../components/formSaveButton/FormSaveButton';
import { isFormValid } from '../../shared/validation';
import { initYourAccountValidationState } from './validation';
import { allFilesForUser, downloadStorageDocument, updateUserData, uploadStorageDocument } from '../../api-client/apiModules/users';
import { Login } from '../login/Login';

export const AccountPage = () => {
    const {user, setUser} = React.useContext(UserContext);
    
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        userType: '',
        id: '',
    });
    const [submittingForm, setSubmittingForm] = useState(false);
    const [file, setFile] = useState('');
    const [uploadedFiles, setUploadedFiles] = useState([] as any);
    
    const initialFormValidationState = initYourAccountValidationState();
    const [validation, setValidation] = useState(initialFormValidationState);

    useEffect(() => {
      const setUserData = async () => {
        if (user.id) {
            setFormData({
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                userType: user.userType|| '',
                id: user.id || '',
            });
            const files = await allFilesForUser(user.id)
            setUploadedFiles(files)
        }
      };
      setUserData();
    }, [user]);


    const updateFormData = (data: Record<string, any>) => {
        setFormData({ ...formData, ...data });
      };

    const handleInputChange = (e: React.ChangeEvent<HTMLFormElement>) => {
        const { name, value } = e.target;

        if(name === 'file') return;

        updateFormData({ [name]: value });
      };

    const onSubmit = async () => {
        setSubmittingForm(true);
        setValidation(initYourAccountValidationState());

        try {
            await updateUserData(formData);
            const newUser = {...user, ...formData}
            setUser(newUser)
            if(file !== ''){
              await uploadStorageDocument(newUser.id, file)
            }
        } catch (e) {
          console.error('Error submitting form', e);
          alert('There was an error.');
        } finally {
          setSubmittingForm(false);
        }
      };

    function handleFileChange(event: any) {
        setFile(event.target.files[0]);
    }


    return (
        <div className="">
          <h2>Login here3</h2>
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
            <div className='mt-3 flex justify-between'>
              <div className='flex'>
                <label className="block text-sm font-medium text-gray-700 mr-3">File</label>
                <input type="file" onChange={handleFileChange} name='file'/>
              </div>
              <div className="flex">
                <label className="block text-sm font-medium text-gray-700 mr-3">Download Past Files: </label>
                <ul>
                {
                  uploadedFiles.map((file: any) => (
                    <li key={file} className='underline text-teal-500' onClick={() => downloadStorageDocument(`${user.id}/${file}`, file)}>
                      <p>{file}</p>
                    </li>
                  ))
                }
                </ul>
              </div>
            </div>
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