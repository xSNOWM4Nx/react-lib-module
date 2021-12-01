import { ILog, LogLevelEnumeration } from '@daniel.neuweiler/ts-lib-module';
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material';

import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import BugReportIcon from '@mui/icons-material/BugReport';
import PersonIcon from '@mui/icons-material/Person';

export const getLogIcon = (log: ILog) => {

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

export const getLogStyle = (log: ILog, theme: Theme): SxProps<Theme> => {

  switch (log.level) {
    case LogLevelEnumeration.UserAction:
      return {
        backgroundColor: (theme) => theme.palette.success.main,
        color: (theme) => theme.palette.success.contrastText,
        fill: (theme: Theme) => theme.palette.success.contrastText
      };
    case LogLevelEnumeration.Info:
      return {
        backgroundColor: (theme) => theme.palette.info.main,
        color: (theme) => theme.palette.info.contrastText,
        fill: (theme: Theme) => theme.palette.info.contrastText
      };
    case LogLevelEnumeration.Debug:
      return {
        backgroundColor: (theme) => theme.palette.primary.main,
        color: (theme) => theme.palette.primary.contrastText,
        fill: (theme: Theme) => theme.palette.primary.contrastText
      };
    case LogLevelEnumeration.Warning:
      return {
        backgroundColor: (theme) => theme.palette.warning.main,
        color: (theme) => theme.palette.warning.contrastText,
        fill: (theme: Theme) => theme.palette.warning.contrastText
      };
    case LogLevelEnumeration.Error:
      return {
        backgroundColor: (theme) => theme.palette.error.main,
        color: (theme) => theme.palette.error.contrastText,
        fill: (theme: Theme) => theme.palette.error.contrastText
      };
    default:
      return {
        backgroundColor: (theme) => theme.palette.info.main,
        color: (theme) => theme.palette.info.contrastText,
        fill: (theme: Theme) => theme.palette.info.contrastText
      };
  }
};
