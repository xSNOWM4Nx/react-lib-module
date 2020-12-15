import React from 'react';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { ILog, LogLevelEnumeration, LocalizeMethod } from '@daniel.neuweiler/ts-lib-module';
import { AutoSizeContainer } from './../containers';

import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';
import BugReportIcon from '@material-ui/icons/BugReport';
import PersonIcon from '@material-ui/icons/Person';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fixedSizeListRoot: {
      overflowX: 'hidden',
      overflowY: 'auto',
      scrollbarWidth: 'thin',
      scrollbarColor: theme.palette.grey[400],
      '&::-webkit-scrollbar': {
        width: '0.4rem'
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: theme.palette.grey[400]
      }
    },
    listItemRoot: {
      padding: 0,
      paddingBottom: 16
    },
    cardRoot: {
      height: '100%',
      borderRadius: 0,
      display: 'flex',
      flex: '1 1 0'
    },
    cardContentRoot: {
      overflow: 'hidden',
      height: '100%',
      width: '100%',
      padding: 0,
      margin: 0,
      display: 'flex',
      flexDirection: 'row'
    },
    iconContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      justifyItems: 'center'
    },
    icon: {
      minWidth: 32,
      minHeight: 32
    },
    contentContainer: {
      flex: 'auto',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      justifyItems: 'center'
    },
    headerText: {
      ...theme.typography.body1,
    },
    logText: {
      ...theme.typography.body2,
    },
  }),
);

interface ILocalProps {
  logs?: Array<ILog>;
  filter?: string;
  minimumFilterLength?: number;
  locale: string;
  onLocalize: LocalizeMethod;
}
type Props = ILocalProps;

export const LogRenderer: React.FC<Props> = (props) => {

  // External hooks
  const classes = useStyles();
  const theme = useTheme();

  const getFilteredLogs = () => {

    var filteredLogs: Array<ILog> = [];
    const minimumFilterLength = props.minimumFilterLength;
    const canFilter = props.filter !== undefined && (minimumFilterLength === undefined || (props.filter.length >= minimumFilterLength));

    if (props.logs) {

      // If no minimal filter length is defined we render all at the beginnig
      if (minimumFilterLength === undefined)
        filteredLogs = props.logs;

      if (canFilter)
        filteredLogs = props.logs.filter((log, index) => {

          return log.loggerKey.toLowerCase().includes(props.filter!.toLowerCase()) ||
            log.message.toLowerCase().includes(props.filter!.toLowerCase())
        })
    }

    return filteredLogs;
  };

  const getIconByLogLevel = (log: ILog) => {

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

  const getBackgroundColorByLogLevel = (log: ILog): string => {

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

  const getForegroundColorByLogLevel = (log: ILog): string => {

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

  const renderRow = (renderProps: ListChildComponentProps) => {

    const { index, style } = renderProps;
    const log = filteredLogs[index];

    var LogIcon = getIconByLogLevel(log);
    var backgroundColor = getBackgroundColorByLogLevel(log);
    var foregroundColor = getForegroundColorByLogLevel(log);

    var timeStampDate = new Date(log.timeStamp);
    var timeStampDateText = `${timeStampDate.toLocaleDateString(props.locale)} ${timeStampDate.getHours()}:${timeStampDate.getMinutes()}:${timeStampDate.getSeconds()}:${timeStampDate.getMilliseconds()}`;

    var headMessage = `${log.prefix} | ${log.loggerKey} | ${LogLevelEnumeration[log.level]} | ${timeStampDateText}`

    return (

      <ListItem
        key={index}
        button={false}
        style={{
          maxHeight: 80,
          ...style,
        }}
        classes={{
          root: classes.listItemRoot
        }}>

        <Card
          classes={{
            root: classes.cardRoot
          }}>

          <CardContent
            classes={{
              root: classes.cardContentRoot
            }}>

            <div
              className={classes.iconContainer}
              style={{
                backgroundColor: backgroundColor,
                color: foregroundColor,
                fill: foregroundColor
              }}>

              <LogIcon className={classes.icon} />
            </div>

            <div style={{ minWidth: theme.spacing(2) }} />

            <div className={classes.contentContainer}>
              <div className={classes.headerText}>
                {headMessage}
              </div>
              <div className={classes.logText}>
                {log.message}
              </div>
            </div>

          </CardContent>
        </Card>
      </ListItem>
    )
  };

  // Helpers
  const filteredLogs = getFilteredLogs();

  return (
    <AutoSizeContainer
      onRenderSizedChild={(height, width) => {

        return (

          <FixedSizeList
            className={classes.fixedSizeListRoot}
            height={height}
            itemCount={filteredLogs.length}
            itemSize={80}
            width='100%'>
            {renderRow}
          </FixedSizeList>
        )
      }} >


    </AutoSizeContainer>
  );
}