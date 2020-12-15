import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    containerRoot: {
      height: '100%',
      width: '100%',
      overflowX: 'hidden',
      overflowY: (props: Props) => props.isScrollLocked ? 'hidden' : 'auto',
      scrollbarWidth: 'thin',
      scrollbarColor: theme.palette.grey[400],
      '&::-webkit-scrollbar': {
        width: '0.4rem'
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: theme.palette.grey[400]
      }
    }
  }),
);

interface ILocalProps {
  className?: string;
  isScrollLocked?: boolean;
}
type Props = ILocalProps;

export const ScrollContainer: React.FC<Props> = (props) => {

  // External hooks
  const classes = useStyles(props);

  return (
    <div className={`${classes.containerRoot} ${props.className}`}>
      {props.children}
    </div>
  );
};
