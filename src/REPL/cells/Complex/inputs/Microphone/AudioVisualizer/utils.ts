function visualize(stream: MediaStream, canvas: HTMLCanvasElement) {
  const audioContext = new window.AudioContext();
  const canvasContext = canvas.getContext('2d');

  // create source for sound input
  const source = audioContext.createMediaStreamSource(stream);
  // create analyser node
  const analyser = audioContext.createAnalyser();

  // connect audio source to analyser
  source.connect(analyser);

  // set a number of audio samples
  analyser.fftSize = 128;

  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  const barWidth = canvas.width / bufferLength;
  let barHeight;
  let barX: number;
  let requestAnimationFrameId: number;

  function animate() {
    barX = 0;
    canvasContext?.clearRect(0, 0, canvas.width, canvas.height);
    analyser.getByteFrequencyData(dataArray);

    dataArray.forEach((velocity) => {
      barHeight = velocity / 2;
      if (canvasContext) {
        // TODO: fix colors
        // eslint-disable-next-line prefer-destructuring
        canvasContext.fillStyle = '#00ff00';
        canvasContext.fillRect(
          canvas.width / 2 - barX,
          canvas.height - barHeight - 10,
          barWidth,
          10,
        );
        canvasContext.fillRect(
          canvas.width / 2 + barX,
          canvas.height - barHeight - 10,
          barWidth,
          10,
        );
        // eslint-disable-next-line prefer-destructuring
        canvasContext.fillStyle = '#eee';
        canvasContext.fillRect(
          canvas.width / 2 - barX,
          canvas.height - barHeight,
          barWidth,
          barHeight,
        );
        canvasContext.fillRect(
          canvas.width / 2 + barX,
          canvas.height - barHeight,
          barWidth,
          barHeight,
        );
        barX += barWidth;
      }
    });

    requestAnimationFrameId = requestAnimationFrame(animate);
  }

  animate();

  function stop() {
    cancelAnimationFrame(requestAnimationFrameId);
    source.disconnect();
  }

  return stop;
}

export { visualize };
