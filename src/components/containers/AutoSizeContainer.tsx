import React, { useState, useRef, useEffect } from 'react';
import { Box } from '@mui/material';

interface ILocalProps {
  className?: string;
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
  useEffect(() => {

    checkContainerSize();
  });

  const handleWindowResize = (e: UIEvent) => {

    if (!isResizing)
      setResizing(true)

    checkContainerSize();

    window.clearTimeout(resizeTimeoutHandleRef.current);
    resizeTimeoutHandleRef.current = window.setTimeout(checkResizing, 300);
  };

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

  return (
    <Box
      ref={containerRef}
      sx={{
        height: '100%',
        width: '100%',
        overflow: 'hidden'
      }}
      className={props.className}>
      {!isResizing && props.onRenderSizedChild && props.onRenderSizedChild(height, width)}
    </Box>
  );
};
