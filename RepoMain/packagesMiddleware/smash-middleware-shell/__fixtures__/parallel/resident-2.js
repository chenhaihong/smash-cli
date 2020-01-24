const id = setInterval(() => {
  console.log('RSD 2');
}, 500);

['SIGINT', 'SIGTERM'].forEach((signal) => {
  process.on(signal, () => {
    clearInterval(id);
    console.log(`RSD 2 - ${signal}`);
    process.exit(0);
  });
});
