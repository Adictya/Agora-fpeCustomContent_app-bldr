/*
********************************************
 Copyright © 2021 Agora Lab, Inc., all rights reserved.
 AppBuilder and all associated components, source code, APIs, services, and documentation 
 (the “Materials”) are owned by Agora Lab, Inc. and its licensors. The Materials may not be 
 accessed, used, modified, or distributed for any purpose without a license from Agora Lab, Inc.  
 Use without a license or in violation of any license terms and conditions (including use for 
 any purpose competitive to Agora Lab, Inc.’s business) is strictly prohibited. For more 
 information visit https://appbuilder.agora.io. 
*********************************************
*/

import React, { useContext, useState } from 'react';
import Error from '../../subComponents/Error';
type ErrorType = {
  name: string;
  message: string
} 
type ErrorContextType = {
  error: ErrorType | undefined,
  setGlobalErrorMessage: (error: any) => void,
  resetError: () => void
}
const ErrorContext = React.createContext((null as unknown) as ErrorContextType);
const ErrorProvider = (props:any) => {
  const [error, setError] = useState<ErrorType>();
  const setGlobalErrorMessage = (error:ErrorType) => {
    setError(error)
  }
  const resetError = () => {
    setError(undefined)
  }
  return (
    <ErrorContext.Provider
      value={{error,setGlobalErrorMessage,resetError}}
    >
      {true ? props.children : <></>}
    </ErrorContext.Provider>
  );
};

const CommonError: React.FC = () => {
  const {error} = useContext(ErrorContext)
  return error ? <Error error={error} showBack={true} /> : <></>
}
export {ErrorContext, ErrorProvider}
export default CommonError;
