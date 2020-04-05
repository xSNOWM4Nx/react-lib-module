import React, { Component } from 'react';
import { LogProvider } from '@daniel.neuweiler/ts-lib-module';

interface ILocalProps {
  sourceName: string;
  onRenderFallback: (source: string, error: any, errorInfo: any) => React.ReactNode;
}
type Props = ILocalProps;

interface ILocalState {
  sourceName: string;
  error: any;
  errorInfo: any;
}
type State = ILocalState;

export class ErrorBoundary extends Component<Props, State> {

  // Fields
  private contextName: string = 'ErrorBoundary'
  private logger = LogProvider.getLogger(this.contextName);

  constructor(props: Props) {
    super(props);

    this.state = {
      sourceName: this.props.sourceName,
      error: null,
      errorInfo: null
    };
  }

  componentDidCatch(error: any, info: any) {

    this.setState({
      error: error,
      errorInfo: info
    })

    if (info)
      this.logger.error(`${error && error.toString()} ${info.componentStack} @'${this.props.sourceName}'`);
  };

  componentDidUpdate() {

    if (this.state.sourceName !== this.props.sourceName) {

      this.setState({
        sourceName: this.props.sourceName,
        error: null,
        errorInfo: null
      })
    }
  };

  render() {

    if (this.state.errorInfo)
      return this.props.onRenderFallback(this.state.sourceName, this.state.error, this.state.errorInfo)

    return this.props.children;
  };
}
