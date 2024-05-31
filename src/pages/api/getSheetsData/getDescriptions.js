import { google } from 'googleapis';
import path from 'path';

const getToolDescriptions = async (req, res) => {
  try {
    // Set up Google Sheets API
    const sheets = google.sheets('v4');
    const auth = new google.auth.GoogleAuth({
      keyFile: path.join(process.cwd(), 'lib/serviceaccount.json'), // Adjust the path as needed
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });
    const authClient = await auth.getClient();

    // Specify the spreadsheetId and range to fetch data from
    const spreadsheetId = '19NSpjRMRGzJ-wWf1icdE4tl2-svXkFlbDr-2Fv4CpWk';
    const range = 'Filtered!B:J'; // Adjust the range as per your sheet

    // Fetch data from Google Sheets
    const response = await sheets.spreadsheets.values.get({
      auth: authClient,
      spreadsheetId,
      range,
    });

    const rows = response.data.values;
    if (rows.length) {
      // Format the data to return Tool ID and Description columns only
      const formattedRows = rows.map((row) => ({
        tool_id: row[0], // Assuming Tool ID is in the first column (B)
        description: row[8], // Assuming Description is in the seventh column (H)
      }));
      res.status(200).json(formattedRows);
    } else {
      res.status(200).json([]);
    }
  } catch (error) {
    console.error('Error fetching data from Google Sheets:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
};

export default getToolDescriptions;
