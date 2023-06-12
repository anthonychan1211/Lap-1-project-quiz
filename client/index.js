const data = fetch(
  `https://api.harvardartmuseums.org/object?apikey=a9e6220a-b263-4a94-a97b-036212a5d45c`
);
data.then((res) => console.log(res));
