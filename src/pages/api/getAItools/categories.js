
export default async function getCategories(req, res) {
    const response = await fetch('https://getaitools6-2ttopirmva-ew.a.run.app/categories', {
          method: 'GET'})
          const data = await response.json();
         res.status(200).json(data);
  };