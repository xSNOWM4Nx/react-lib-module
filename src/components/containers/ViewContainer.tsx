import React, { useState, useRef, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { ScrollContainer } from './ScrollContainer';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    containerRoot: {
      height: '100%',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: (props: Props) => props.backgroundColor ? props.backgroundColor : 'inherit'
    },
    containerContent: {
      flex: 'auto',
      overflowY: 'hidden'
    },
  }),
);

interface ILocalProps {
  isScrollLocked?: boolean;
  backgroundColor?: string;
}
type Props = ILocalProps;

export const ViewContainer: React.FC<Props> = (props) => {

  // External hooks
  const classes = useStyles(props);

  return (
    <div className={classes.containerRoot}>

      <div className={classes.containerContent}>
        <ScrollContainer
          isScrollLocked={props.isScrollLocked}>
          {props.children}
        </ScrollContainer>
      </div>

    </div>
  );
};
