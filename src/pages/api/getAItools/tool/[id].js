export default async function getToolById(req, res) {
    const { id } = req.query;
  
    try {
      //https://getfullaitools-2ttopirmva-uc.a.run.app
      const response = await fetch('https://databasewithdesc3-2ttopirmva-uc.a.run.app/', {
        method: 'GET'
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      
      // Find the tool with the given id
      const tool = data.find(tool => tool.tool_id.toString() === id);
  
      if (!tool) {
        return res.status(404).json({ message: 'Tool not found' });
      }
  
      res.status(200).json(tool);
    } catch (error) {
      console.error('Error fetching tool data:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  