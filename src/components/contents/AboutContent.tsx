import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import GitHubIcon from '@material-ui/icons/GitHub';
import { ReactComponent as NpmIcon } from './../../resources/icons/npmicon.svg';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import { ReactComponent as ArtstationIcon } from './../../resources/icons/artstationicon.svg';
import InstagramIcon from '@material-ui/icons/Instagram';

interface IAboutData {
  ariaLabel: string;
  url: string;
  Icon: React.FunctionComponent<any> | React.ComponentType<any>
};

interface ILocalProps {
  size?: number;
};
type Props = ILocalProps;

const useStyles = makeStyles<Theme, Props>((theme: Theme) =>
  createStyles({
    root: {
      height: '100%',
      width: '100%',
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      alignContent: "center",
      justifyItems: "center",
      justifyContent: "center"
    },
    header: {
      width: '100%',
      flex: 'auto',
    },
    elementContainer: {
      height: (props) => {

        if (props.size !== undefined)
          return props.size;
        return 256;
      },
      width: (props) => {

        if (props.size !== undefined)
          return props.size;
        return 256;
      },
      color: '#fff',
      fill: '#fff'
    },
    element: {
      position: 'absolute',
      top: 'calc(50% - 16px)',
      left: 'calc(50% - 48px)',
      animation: 'genericRotating 30s linear infinite'
    },
    icon: {
      height: 64,
      width: 64,
      color: '#fff',
      fill: '#fff'
    },
    footer: {
      width: '100%',
      flex: 'auto',
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      alignContent: "flex-end",
      justifyItems: "flex-end",
      justifyContent: "flex-end"
    }
  }),
);

export const AboutContent: React.FC<Props> = (props) => {

  // External hooks
  const classes = useStyles(props);

  // Data seeding
  const elements: Array<IAboutData> = [
    {
      ariaLabel: 'LinkedIn',
      url: 'https://www.linkedin.com/in/daniel-neuweiler/',
      Icon: LinkedInIcon
    },
    {
      ariaLabel: 'GitHub',
      url: 'https://github.com/xSNOWM4Nx',
      Icon: GitHubIcon
    },
    {
      ariaLabel: 'Npm',
      url: 'https://www.npmjs.com/~daniel.neuweiler',
      Icon: NpmIcon
    },
    {
      ariaLabel: 'ArtStation',
      url: 'https://www.artstation.com/danielneuweiler',
      Icon: ArtstationIcon
    },
    {
      ariaLabel: 'Twitter',
      url: 'https://twitter.com/DanielNeuweiler',
      Icon: TwitterIcon
    },
    {
      ariaLabel: 'Facebook',
      url: 'https://www.facebook.com/daniel.neuweiler.1/',
      Icon: FacebookIcon
    },
    {
      ariaLabel: 'Instagram',
      url: 'https://www.instagram.com/danielneuweiler/',
      Icon: InstagramIcon
    }
  ];

  // Get element offset
  const elementOffset = 360 / elements.length;

  return (
    <div className={classes.root}>

      <div className={classes.header}>

      </div>

      <div
        className={classes.elementContainer}
        style={{
          ['--offsetDegree' as any]: `${elementOffset}deg`,
        }}>

        {elements.map((elementData, index) => {

          return (

            <div
              key={index}
              className={classes.element}
              style={{
                ['--offsetFactor' as any]: index,
              }}>

              <IconButton
                aria-label={elementData.ariaLabel}
                onClick={() => {

                  const newWindow = window.open(elementData.url, '_blank', 'noopener,noreferrer');
                  if (newWindow) newWindow.opener = null;
                }}>
                <elementData.Icon className={classes.icon} />
              </IconButton>
            </div>
          )
        })}
      </div>

      <div className={classes.footer}>

        <Typography
          variant='h6'>
          {`${new Date(Date.now()).getFullYear()} ✌️`}
        </Typography>
      </div>

    </div>
  );
};
