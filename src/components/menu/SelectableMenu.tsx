import React from 'react';
import { LocalizeMethod } from '@daniel.neuweiler/ts-lib-module';
import { ISelectableProps } from './../../props';

import { Box, Menu, MenuItem, Typography } from '@mui/material';

interface ILocalProps {
  className?: string;
  anchor: HTMLElement | null;
  items?: Array<ISelectableProps>;
  selectedIndex?: number;
  typoVariant?: "button" | "caption" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "inherit" | "subtitle1" | "subtitle2" | "body1" | "body2" | "overline" | undefined;
  onLocalize: LocalizeMethod;
  onSelect: (e: React.MouseEvent<HTMLElement>, item: ISelectableProps, index: number) => void;
  onClose?: (e: React.MouseEvent<HTMLElement>) => void;
}
type Props = ILocalProps;

export const SelectableMenu: React.FC<Props> = (props) => {

  const renderItemIcon = (IconElement?: React.FunctionComponent<any> | React.ComponentType<any> | string) => {

    if (!IconElement)
      return (
        <Box sx={{ width: 36 }} />
      )

    if (typeof IconElement === 'string')
      return (
        <Box
          component='span'
          sx={{
            width: 36,
            fontSize: 24
          }}>
          {IconElement}
        </Box>
      );

    return (
      <IconElement style={{ width: 36 }} />
    )
  };

  if (!props.items)
    return null;

  return (

    <Menu
      className={props.className}
      anchorEl={props.anchor}
      open={Boolean(props.anchor)}
      onClose={props.onClose}>

      {props.items
        .filter((item) => item.isVisible === undefined || item.isVisible)
        .map((item, index) => {

          var itemIndex = props.items!.indexOf(item);
          var isSelectedItem = (props.selectedIndex !== undefined) ? (props.selectedIndex === itemIndex) : false;

          return (

            <MenuItem
              sx={{
                '& .MuiMenuItem-root': {
                  backgroundColor: (theme) => theme.palette.primary.main,
                  color: (theme) => theme.palette.primary.contrastText
                },
                '& .Mui-selected': {
                  backgroundColor: (theme) => theme.palette.primary.main,
                  color: (theme) => theme.palette.primary.contrastText
                },
              }}
              key={itemIndex}
              selected={isSelectedItem}
              onClick={(e) => props.onSelect(e, item, itemIndex)} >

              {renderItemIcon(item.icon)}

              <Box
                sx={{ width: (theme) => theme.spacing(2) }} />

              <Typography
                variant={(props.typoVariant !== undefined) ? props.typoVariant : 'h5'}>
                {props.onLocalize(item.display)}
              </Typography>

            </MenuItem>
          )
        })}
    </Menu>
  );
}
