import React, { useRef, useEffect } from 'react';
import { ServiceProvider, IService } from '@mymodules/ts-lib-module';

// Definition for context props
export interface ServiceContextProps {
  getService: <T extends IService>(serviceKey: string) => T | undefined;
  startServices: () => Promise<boolean>;
  stopServices: () => Promise<boolean>;
  setAuthenticationToken: (token: string) => void;
}

// Create the context
export const ServiceContext = React.createContext<ServiceContextProps>({
  getService: () => undefined,
  startServices: () => Promise.resolve(false),
  stopServices: () => Promise.resolve(false),
  setAuthenticationToken: () => { },
});

// Create a service provider
const serviceProvider = new ServiceProvider('ServiceProvider');

// Definiton for context provider props
export interface ServiceContextProviderProps {
}

interface ILocalProps {
}
type Props = ILocalProps & ServiceContextProviderProps;

const ServiceContextProvider: React.FC<Props> = (props) => {

  // Refs
  const serviceProviderRef = useRef(serviceProvider);

  // Effects
  useEffect(() => {

    // Mount
    serviceProviderRef.current.startServices();

    // Unmount
    return () => {

      serviceProviderRef.current.stopServices();
    }
  }, []);

  return (
    <ServiceContext.Provider value={
      {
        getService: serviceProviderRef.current.getService,
        startServices: serviceProviderRef.current.startServices,
        stopServices: serviceProviderRef.current.stopServices,
        setAuthenticationToken: serviceProviderRef.current.setAuthenticationToken,
      }} >
      {props.children}
    </ServiceContext.Provider>
  );
}

export default ServiceContextProvider;
