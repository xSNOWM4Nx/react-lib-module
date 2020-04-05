import { ISelectableBase, ISelectableValue } from '@daniel.neuweiler/ts-lib-module';

export interface ISelectableProps extends ISelectableBase {
  icon?: React.FunctionComponent<any> | React.ComponentType<any> | string;
};

export type SelectableProps = ISelectableProps;

export interface ISelectableValueProps<T> extends ISelectableValue<T> {
  icon?: React.FunctionComponent<any> | React.ComponentType<any> | string;
};

export type SelectableValueProps<T> = ISelectableValueProps<T>;
