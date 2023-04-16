import { IndexNumberProps } from './typed';
import { Box } from '../../../styled';
import CircularProgress from '../CircularProgress';
import { useEffect, useState } from 'react';
import { IndexRow } from './styled';

function IndexNumber({ index, isLoading }: IndexNumberProps) {
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    if (isLoading) {
      timerId = setTimeout(() => setShowLoading(true), 300);
    }

    return () => clearTimeout(timerId);
  }, [isLoading]);

  function getContent() {
    if (showLoading) {
      return <CircularProgress />;
    }

    return (
      <>
        <Box>In</Box>
        <Box>[{index}]:</Box>
      </>
    );
  }

  return (
    <IndexRow style={{ justifyContent: showLoading ? 'center' : 'space-between' }}>
      {getContent()}
    </IndexRow>
  );
}

export default IndexNumber;
