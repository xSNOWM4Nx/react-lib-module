import { INavigationElementBase } from '@daniel.neuweiler/ts-lib-module';

export interface INavigationElementProps extends INavigationElementBase {
  icon?: React.FunctionComponent<any> | React.ComponentType<any> | string;
};

export type NavigationElementProps = INavigationElementProps;
