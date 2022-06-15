export const services = (urlPart: string) => fetch(`http://localhost:3001/${urlPart}`)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
  });
