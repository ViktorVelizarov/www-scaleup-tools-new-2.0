
export default async function getTools(req, res) {
  const response = await fetch('https://cloudfunctions-2ttopirmva-uc.a.run.app', {
        method: 'GET'})
        const data = await response.json();
       res.status(200).json(data);
};