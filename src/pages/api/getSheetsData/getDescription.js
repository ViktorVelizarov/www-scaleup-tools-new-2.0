
export default async function getTools(req, res) {
    const { toolId } = req.query;
  
    try {
      const response = await fetch(`https://cloudfunctions-2ttopirmva-uc.a.run.app/getDescription/${toolId}`);
      const data = await response.json();
      res.status(200).json({data});
    } catch (error) {
      console.error('Error fetching description:', error);
      res.status(500).json({ error: 'Failed to fetch description' });
    }
  }