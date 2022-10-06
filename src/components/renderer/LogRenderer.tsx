/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import React from 'react';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { Box, Typography, ListItem, Card, CardContent } from '@mui/material';
import { ILog, LogLevelEnumeration, LocalizeMethod } from '@daniel.neuweiler/ts-lib-module';
import { useTheme } from '@mui/material/styles';
import { AutoSizeContainer } from './../containers';
import { getLogIcon, getLogStyle } from './../../styles';

interface ILocalProps {
  logs?: Array<ILog>;
  filter?: string;
  minimumFilterLength?: number;
  locale: string;
  onLocalize: LocalizeMethod;
}
type Props = ILocalProps;

export const LogRenderer: React.FC<Props> = (props) => {

  // Fields
  const listItemSize: number = 112;

  // External hooks
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

  const renderStatus = (log: ILog) => {

    var LogIcon = getLogIcon(log);
    var logStyle = getLogStyle(log, theme);

    return (

      <Box
        sx={{
          height: '100%',
          width: 40,
          maxWidth: 40,
          display: 'flex',
          flexDirection: 'row',
          alignContent: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          justifyItems: 'center',
          ...logStyle
        }}>

        <LogIcon
          sx={{
            minWidth: 32,
            minHeight: 32
          }} />
      </Box>
    );
  };

  const renderRow = (renderProps: ListChildComponentProps) => {

    const { index, style } = renderProps;
    const log = filteredLogs[index];

    var timeStampDate = new Date(log.timeStamp);
    var timeStampDateText = `${timeStampDate.toLocaleDateString(props.locale)} ${timeStampDate.getHours()}:${timeStampDate.getMinutes()}:${timeStampDate.getSeconds()}:${timeStampDate.getMilliseconds()}`;

    var infoMessage = `${log.prefix} | ${log.loggerKey} | ${LogLevelEnumeration[log.level]} | ${timeStampDateText}`

    return (

      <ListItem
        key={index}
        button={false}
        style={{ ...style }}
        sx={{
          maxHeight: listItemSize - 16,
          height: listItemSize - 16,
          padding: 0,
          boxShadow: 5,
          backgroundColor: (theme) => theme.palette.background.paper
        }}>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%'
          }}>

          {renderStatus(log)}

          <Box sx={{ minWidth: theme.spacing(1) }} />

          <Box
            sx={{
              flex: 'auto',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              justifyItems: 'center'
            }}>
            <Typography
              variant='h6'>
              {log.message}
            </Typography>
            <Typography
              variant='body2'>
              {infoMessage}
            </Typography>
          </Box>
        </Box>
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
            css={(theme) => ({
              overflowX: 'hidden',
              overflowY: 'auto',
              scrollbarWidth: 'thin',
              scrollbarColor: theme.palette.secondary.main,
              '&::-webkit-scrollbar': {
                width: '0.4rem'
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: theme.palette.secondary.main
              }
            })}
            height={height}
            itemCount={filteredLogs.length}
            itemSize={listItemSize}
            width='100%'>
            {renderRow}
          </FixedSizeList>
        )
      }} >

    </AutoSizeContainer>
  );
}