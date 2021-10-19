import { ILog, LogLevelEnumeration } from '@daniel.neuweiler/ts-lib-module';
import { Theme } from '@mui/material/styles';

import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import BugReportIcon from '@mui/icons-material/BugReport';
import PersonIcon from '@mui/icons-material/Person';

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
      return theme.palette.primary.contrastText;
    case LogLevelEnumeration.Warning:
      return theme.palette.warning.contrastText;
    case LogLevelEnumeration.Error:
      return theme.palette.error.contrastText;
    default:
      return theme.palette.info.contrastText;
  }
};
