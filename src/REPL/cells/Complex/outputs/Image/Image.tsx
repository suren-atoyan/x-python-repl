import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

import HideImageIcon from '@mui/icons-material/HideImage';
import GlobalStyles from '@mui/material/GlobalStyles';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';

import useImage from 'baseten/hooks/useImage';

import { OutputComponentProps } from '../types';
import { EmptyState, Img, Placeholder } from './styled';

function Image({ data }: OutputComponentProps) {
  const [loaded, error] = useImage(data);

  if (error) {
    return (
      <EmptyState>
        <HideImageIcon />
        <Typography color="secondary">We couldn&apos;t load your image ;(</Typography>
      </EmptyState>
    );
  }

  if (loaded) {
    return (
      <>
        <GlobalStyles
          styles={{
            'div[data-rmiz-modal-overlay="visible"]': {
              backgroundColor: 'transparent',
              backdropFilter: 'blur(5px)',
              transition: 'all 0.3s',
            },
            'div[data-rmiz-modal-content]': {
              cursor: 'zoom-out',
            },
            'button[data-rmiz-btn-unzoom]': {
              display: 'none',
            },
          }}
        />
        <Zoom zoomMargin={100}>
          <Img src={data} />
        </Zoom>
      </>
    );
  }

  return (
    <Placeholder>
      <Skeleton variant="rectangular" height="100%" />
    </Placeholder>
  );
}

export default Image;
