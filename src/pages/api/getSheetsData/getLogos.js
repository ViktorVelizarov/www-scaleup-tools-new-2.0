import { google } from 'googleapis';
import path from 'path';

const getSheetsData = async (req, res) => {
  try {
    const sheets = google.sheets('v4');
    const auth = new google.auth.GoogleAuth({
      keyFile: path.join(process.cwd(), 'lib/serviceaccount.json'), // Adjust the path as needed
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const authClient = await auth.getClient();

    const response = await sheets.spreadsheets.values.get({
      auth: authClient,
      spreadsheetId: '19NSpjRMRGzJ-wWf1icdE4tl2-svXkFlbDr-2Fv4CpWk',
      range: 'Filtered!B:P', // Adjust the range as per your sheet
    });

    const rows = response.data.values;
    if (rows.length) {
      const formattedRows = rows.map((row) => ({
        id: row[0],
        description: row[7], 
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

export default getSheetsData;
