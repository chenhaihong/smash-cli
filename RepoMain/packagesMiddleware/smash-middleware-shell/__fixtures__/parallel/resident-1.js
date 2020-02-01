const id = setInterval(() => {
  console.log('RSD 1');
}, 500);

['SIGINT', 'SIGTERM'].forEach((signal) => {
  process.on(signal, () => {
    clearInterval(id);
    console.log(`RSD 1 - ${signal}`);
    process.exit(0);
  });
});
