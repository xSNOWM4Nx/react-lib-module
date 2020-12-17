import React, { useRef, useState, useEffect } from 'react';
import { ServiceProvider, IService } from '@daniel.neuweiler/ts-lib-module';

// Definition for context props
export interface GlobalContextProps {
  getService: <T extends IService>(serviceKey: string) => T | undefined;
  startServices: () => Promise<boolean>;
  stopServices: () => Promise<boolean>;
  storeSetting: (key: string, value: any) => boolean;
  getSetting: (key: string) => any;
}

// Create the context
export const GlobalContext = React.createContext<GlobalContextProps>({
  getService: () => undefined,
  startServices: () => Promise.resolve(false),
  stopServices: () => Promise.resolve(false),
  storeSetting: (key: string, value: any) => false,
  getSetting: (key: string) => undefined
});

// Create a service provider
const serviceProvider = new ServiceProvider('ServiceProvider');

// Definiton for context provider props
export interface ProviderContextLocalProps {
  onInjectCustomServices?: () => Array<IService>;
}

interface ILocalProps {
}
type Props = ILocalProps & ProviderContextLocalProps;

export const GlobalContextProvider: React.FC<Props> = (props) => {

  // Refs
  const serviceProviderRef = useRef(serviceProvider);
  const isMountedRef = useRef(false);

  const [settingsStorage, setSettingsStorage] = useState<{ [key: string]: any }>({});

  // Effects
  useEffect(() => {

    // Mount
    serviceProviderRef.current.startServices();
    isMountedRef.current = true;

    // Unmount
    return () => {

      serviceProviderRef.current.stopServices();
      isMountedRef.current = false;
    }
  }, []);

  const handleStoreSetting = (key: string, value: any) => {

    const settingsStorageCopy = { ...settingsStorage };
    settingsStorageCopy[key] = value;
    setSettingsStorage(settingsStorageCopy);

    return true;
  };

  const handleGetSetting = (key: string,) => {
    return settingsStorage[key];
  };

  if (!isMountedRef.current) {

    if (props.onInjectCustomServices) {

      var servicesToInject = props.onInjectCustomServices();
      servicesToInject.forEach(service => serviceProviderRef.current.addService(service, service.key))
    }
  };

  return (
    <GlobalContext.Provider
      value={
        {
          getService: serviceProviderRef.current.getService,
          startServices: serviceProviderRef.current.startServices,
          stopServices: serviceProviderRef.current.stopServices,
          storeSetting: handleStoreSetting,
          getSetting: handleGetSetting
        }} >
      {props.children}
    </GlobalContext.Provider>
  );
};
