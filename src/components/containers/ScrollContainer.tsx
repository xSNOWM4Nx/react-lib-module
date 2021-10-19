import React from 'react';
import { Box } from '@mui/material';

interface ILocalProps {
  className?: string;
  isScrollLocked?: boolean;
}
type Props = ILocalProps;

export const ScrollContainer: React.FC<Props> = (props) => {

  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        overflowX: 'hidden',
        overflowY: props.isScrollLocked ? 'hidden' : 'auto',
        scrollbarWidth: 'thin',
        scrollbarColor: (theme) => theme.palette.grey[600],
        '&::-webkit-scrollbar': {
          width: '0.4rem'
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: (theme) => theme.palette.grey[600]
        }
      }}
      className={props.className}>
      {props.children}
    </Box>
  );
};
