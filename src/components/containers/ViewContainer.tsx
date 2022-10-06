import React from 'react';
import { Box } from '@mui/material';
import { ScrollContainer } from './ScrollContainer';

interface ILocalProps {
  children?: React.ReactNode;
  isScrollLocked?: boolean;
  backgroundColor?: string;
};
type Props = ILocalProps;

export const ViewContainer: React.FC<Props> = (props) => {

  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: props.backgroundColor ? props.backgroundColor : 'inherit'
      }}>

      <Box
        sx={{
          flex: 'auto',
          overflowY: 'hidden'
        }}>

        <ScrollContainer
          isScrollLocked={props.isScrollLocked}>
          {props.children}
        </ScrollContainer>
      </Box>

    </Box>
  );
};
