import React from 'react';
import ServiceContextProvider, { ServiceContextProviderProps } from './ServiceContext';

interface ILocalProps {
}
type Props = ILocalProps & ServiceContextProviderProps;

export const ApplicationProvider: React.FC<Props> = (props) => {

  // Props assertions
  var serviceContextProviderProps = props as ServiceContextProviderProps;

  return (
    <ServiceContextProvider
      {...serviceContextProviderProps}>
      {props.children}
    </ServiceContextProvider>
  );
}
