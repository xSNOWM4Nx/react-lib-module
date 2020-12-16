import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { LocalizeMethod } from '@daniel.neuweiler/ts-lib-module';
import { ISelectableProps } from './../../props';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuPpaper: {
      //backgroundColor: 'inherit'
    },
    menuItemRoot: {
    },
    menuItemSelected: {
      backgroundColor: theme.palette.primary.main
    },
  }),
);

interface ILocalProps {
  className?: string;
  anchor: HTMLElement | null;
  items?: Array<ISelectableProps>;
  selectedIndex?: number;
  typoVariant?: "button" | "caption" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "inherit" | "subtitle1" | "subtitle2" | "body1" | "body2" | "overline" | "srOnly" | undefined;
  onLocalize: LocalizeMethod;
  onSelect: (e: React.MouseEvent<HTMLElement>, element: ISelectableProps, index: number) => void;
  onClose?: (e: React.MouseEvent<HTMLElement>) => void;
}
type Props = ILocalProps;

export const SelectableMenu: React.FC<Props> = (props) => {

  // External hooks
  const classes = useStyles(props);

  const renderItemIcon = (IconElement?: React.FunctionComponent<any> | React.ComponentType<any> | string) => {

    if (!IconElement)
      return (
        <div style={{ width: 36 }} />
      )

    if (typeof IconElement === 'string')
      return (
        <span style={{
          width: 36,
          fontSize: 24
        }}>
          {IconElement}
        </span>
      );

    return (
      <IconElement style={{ width: 36 }} />
    )
  };

  if (!props.items)
    return null;

  return (

    <Menu
      className={`${props.className}`}
      classes={{
        paper: classes.menuPpaper
      }}
      anchorEl={props.anchor}
      getContentAnchorEl={null}
      open={Boolean(props.anchor)}
      onClose={props.onClose}>

      {props.items
        .filter((item) => item.isVisible === undefined || item.isVisible)
        .map((item, index) => {

          var itemIndex = props.items!.indexOf(item);
          var isSelectedItem = (props.selectedIndex !== undefined) ? (props.selectedIndex === itemIndex) : false;

          return (

            <MenuItem
              classes={{
                //root: 'selectablemenu-item-root',
                selected: classes.menuItemSelected
              }}
              key={itemIndex}
              selected={isSelectedItem}
              onClick={(e) => props.onSelect(e, item, itemIndex)} >

              {renderItemIcon(item.icon)}

              <div className='v2' />

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
