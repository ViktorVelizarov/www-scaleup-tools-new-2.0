export default async function getToolByID(req, res) {
  const { id } = req.query;  // Extracting id from req.query

  try {
    const response = await fetch(`https://cloudfunctionslast-2ttopirmva-uc.a.run.app/tool/${id}`);
    const data = await response.json();
    res.status(200).json({ data });
  } catch (error) {
    console.error('Error fetching description:', error);
    res.status(500).json({ error: 'Failed to fetch description' });
  }
}
