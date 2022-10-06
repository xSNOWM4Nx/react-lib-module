import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { SxProps } from '@mui/system';
import { Box, Theme } from '@mui/material';

interface ILocalProps {
  children?: React.ReactNode;
  containerStyle?: SxProps<Theme>;
  isScrollLocked?: boolean;
  showContentOnResize?: boolean;
  onSizeChanged?: (height: number, width: number) => void;
  onRenderSizedChild?: (height: number, width: number) => React.ReactNode;
}
type Props = ILocalProps;

export const AutoSizeContainer: React.FC<Props> = (props) => {

  // States
  const [isResizing, setResizing] = useState<boolean>(false);
  const [height, setHeight] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const resizeTimeoutHandleRef = useRef(-1);

  const isResizingRef = useRef(isResizing);
  isResizingRef.current = isResizing;

  const heightRef = useRef(height);
  heightRef.current = height;

  const widthRef = useRef(width);
  widthRef.current = width;

  // Effects
  useEffect(() => {

    // Mount
    window.addEventListener('resize', handleWindowResize);

    // Unmount
    return () => {

      window.removeEventListener('resize', handleWindowResize);
    }
  }, []);
  useLayoutEffect(() => {

    checkContainerSize();
  });

  const checkResizing = () => {

    var isStillResizing = false;

    if (containerRef.current !== null)
      if (containerRef.current.offsetHeight !== heightRef.current)
        isStillResizing = true;

    if (containerRef.current !== null)
      if (containerRef.current.offsetWidth !== widthRef.current)
        isStillResizing = true;

    if (isResizingRef.current)
      if (!isStillResizing)
        setResizing(false);
  };

  const handleWindowResize = (e: UIEvent) => {

    if (!isResizing)
      setResizing(true)

    checkContainerSize();

    window.clearTimeout(resizeTimeoutHandleRef.current);
    resizeTimeoutHandleRef.current = window.setTimeout(checkResizing, 100);
  };

  const checkContainerSize = () => {

    if (containerRef.current === null)
      return;

    if (containerRef.current.offsetHeight !== height)
      setHeight(containerRef.current.offsetHeight);

    if (containerRef.current.offsetWidth !== width)
      setWidth(containerRef.current.offsetWidth);

    if ((containerRef.current.offsetHeight !== height) ||
      (containerRef.current.offsetWidth !== width)) {

      if (props.onSizeChanged)
        props.onSizeChanged(containerRef.current.offsetHeight, containerRef.current.offsetWidth);
    }
  };

  const renderContent = () => {

    if (containerRef.current === null)
      return null;

    if ((containerRef.current.offsetHeight !== height) ||
      (containerRef.current.offsetWidth !== width)) {

      return null;
    };

    if (!props.onRenderSizedChild)
      return props.children;

    if (showContentOnResize) {

      return props.onRenderSizedChild(height, width);
    }
    else {

      if (isResizing)
        return null;

      return props.onRenderSizedChild(height, width);
    };
  };

  // Helpers
  const isScrollLocked = props.isScrollLocked !== undefined ? props.isScrollLocked : false;
  const showContentOnResize = props.showContentOnResize !== undefined ? props.showContentOnResize : false;

  return (
    <Box
      ref={containerRef}
      sx={{
        height: '100%',
        width: '100%',
        overflow: 'hidden',
        ...props.containerStyle
      }}>

      {renderContent()}
    </Box>
  );
}
