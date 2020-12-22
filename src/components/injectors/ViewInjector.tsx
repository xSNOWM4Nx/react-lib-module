import React, { useMemo, Suspense } from 'react';
import { useTheme } from '@material-ui/core/styles';

import { NavigationElementProps, ViewProps } from './../../props';
import { ErrorBoundary } from './../ErrorBoundary';
import { ErrorContent } from '../contents/ErrorContent';
import { ViewContainer } from './../containers/ViewContainer';
import { Indicator1 } from './../indicators';

interface ILocalProps {
  navigationElement: NavigationElementProps;
  onImportView: (navigationElement: NavigationElementProps) => React.LazyExoticComponent<React.ComponentType<ViewProps>>;
}
type Props = ILocalProps;

export const ViewInjector: React.FC<Props> = (props) => {

  // External hooks
  const theme = useTheme();

  // Memoized lazy import of a view component
  const GenericView = useMemo((): React.LazyExoticComponent<React.ComponentType<ViewProps>> => {
    return props.onImportView(props.navigationElement);
  }, [props.navigationElement.key]);

  return (

    <ErrorBoundary
      sourceName={props.navigationElement.importPath}
      onRenderFallback={(source, error, errorInfo) => {
        return (

          <ViewContainer
            isScrollLocked={true}>

            <ErrorContent
              sourceName={source}
              errorMessage={error && error.toString()}
              stackInfo={errorInfo.componentStack} />
          </ViewContainer>
        )
      }}>
      <Suspense
        fallback={

          <ViewContainer
            isScrollLocked={true}>

            <Indicator1
              color={theme.palette.primary.main}
              scale={2.0} />
          </ViewContainer>
        }>

        <GenericView />
      </Suspense>
    </ErrorBoundary>
  );
}
