import React from 'react';
import {useFpe} from 'fpe-api';

export const POC_CustomUserContextHolder: React.FC = (props) => {
  const useFpeContext = useFpe((config) => config.poc.useUserContext);
  const Component = useFpeContext();
  if (Component) {
    if (typeof Component === 'function') {
      return (
        <>
          <Component />
          {props.children}
        </>
      );
    } else if (Component.provider) {
      return <Component.provider>{props.children}</Component.provider>;
    } else {
      return props.children;
    }
  } else {
    return props.children;
  }
};
