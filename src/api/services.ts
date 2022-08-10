export const services = (urlPart: string) => fetch(`https://sheltered-fortress-90022.herokuapp.com/${urlPart}`)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
  });
