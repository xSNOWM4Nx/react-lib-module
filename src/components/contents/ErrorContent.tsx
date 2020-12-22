import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    containerRoot: {
      height: '100%',
      width: '100%',
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      alignContent: "center",
      justifyItems: "center",
      justifyContent: "center"
    },
    symbol: {
      fontSize: 100
    },
    title: {
      fontSize: 24
    },
    text: {
      fontSize: 16,
      maxWidth: 1024
    }
  }),
);

interface ILocalProps {
  sourceName: string;
  errorMessage: string;
  stackInfo?: string;
}
type Props = ILocalProps;

export const ErrorContent: React.FC<Props> = (props) => {

  // External hooks
  const classes = useStyles();

  return (
    <div className={classes.containerRoot}>
      <span className={classes.symbol}>🤔</span>
      <div className={classes.title}> {`Oops, something went wrong @'${props.sourceName}'`} </div>
      <div className={classes.text}> {props.errorMessage} </div>
      <div className={classes.text}> {props.stackInfo} </div>
    </div>
  );
}
