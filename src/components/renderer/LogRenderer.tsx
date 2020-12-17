import React from 'react';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { ILog, LogLevelEnumeration, LocalizeMethod } from '@daniel.neuweiler/ts-lib-module';
import { AutoSizeContainer } from './../containers';
import { getIconByLogLevel, getBackgroundColorByLogLevel, getForegroundColorByLogLevel } from './../../styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fixedSizeListRoot: {
      overflowX: 'hidden',
      overflowY: 'auto',
      scrollbarWidth: 'thin',
      scrollbarColor: theme.palette.grey[600],
      '&::-webkit-scrollbar': {
        width: '0.4rem'
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: theme.palette.grey[600]
      }
    },
    listItemRoot: {
      padding: 0,
      paddingBottom: theme.spacing(1),
      paddingRight: theme.spacing(1)
    },
    cardRoot: {
      backgroundColor: theme.palette.grey[500],
      width: '100%',
      height: '100%',
    },
    cardContentRoot: {
      overflow: 'hidden',
      height: '100%',
      display: 'flex',
      flexDirection: 'row',
      padding: 0,
      margin: 0,
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
    primaryText: {
      ...theme.typography.h6,
    },
    secondaryText: {
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

  const renderRow = (renderProps: ListChildComponentProps) => {

    const { index, style } = renderProps;
    const log = filteredLogs[index];

    var LogIcon = getIconByLogLevel(log);
    var backgroundColor = getBackgroundColorByLogLevel(log, theme);
    var foregroundColor = getForegroundColorByLogLevel(log, theme);

    var timeStampDate = new Date(log.timeStamp);
    var timeStampDateText = `${timeStampDate.toLocaleDateString(props.locale)} ${timeStampDate.getHours()}:${timeStampDate.getMinutes()}:${timeStampDate.getSeconds()}:${timeStampDate.getMilliseconds()}`;

    var infoMessage = `${log.prefix} | ${log.loggerKey} | ${LogLevelEnumeration[log.level]} | ${timeStampDateText}`

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

            <div style={{ minWidth: theme.spacing(1) }} />

            <div className={classes.contentContainer}>
              <div className={classes.primaryText}>
                {log.message}
              </div>
              <div className={classes.secondaryText}>
                {infoMessage}
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