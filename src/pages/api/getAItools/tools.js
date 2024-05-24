
export default async function getTools(req, res) {
  const response = await fetch('https://getaitools6-2ttopirmva-ew.a.run.app', {
        method: 'GET'})
        const data = await response.json();
       res.status(200).json(data);
};