import { ILog, LogLevelEnumeration } from '@daniel.neuweiler/ts-lib-module';
import { Theme } from '@material-ui/core/styles';

import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';
import BugReportIcon from '@material-ui/icons/BugReport';
import PersonIcon from '@material-ui/icons/Person';

export const getIconByLogLevel = (log: ILog) => {

  switch (log.level) {
    case LogLevelEnumeration.UserAction:
      return PersonIcon;
    case LogLevelEnumeration.Info:
      return InfoIcon;
    case LogLevelEnumeration.Debug:
      return BugReportIcon;
    case LogLevelEnumeration.Warning:
      return WarningIcon;
    case LogLevelEnumeration.Error:
      return ErrorIcon;
    default:
      return InfoIcon;
  }
};

export const getBackgroundColorByLogLevel = (log: ILog, theme: Theme): string => {

  switch (log.level) {
    case LogLevelEnumeration.UserAction:
      return theme.palette.success.main;
    case LogLevelEnumeration.Info:
      return theme.palette.info.main;
    case LogLevelEnumeration.Debug:
      return theme.palette.primary.main;;
    case LogLevelEnumeration.Warning:
      return theme.palette.warning.main;
    case LogLevelEnumeration.Error:
      return theme.palette.error.main;
    default:
      return theme.palette.info.main;
  }
};

export const getForegroundColorByLogLevel = (log: ILog, theme: Theme): string => {

  switch (log.level) {
    case LogLevelEnumeration.UserAction:
      return theme.palette.success.contrastText;
    case LogLevelEnumeration.Info:
      return theme.palette.info.contrastText;
    case LogLevelEnumeration.Debug:
      return theme.palette.primary.contrastText;;
    case LogLevelEnumeration.Warning:
      return theme.palette.warning.contrastText;
    case LogLevelEnumeration.Error:
      return theme.palette.error.contrastText;
    default:
      return theme.palette.info.contrastText;
  }
};
