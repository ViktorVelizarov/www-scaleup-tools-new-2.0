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
      spreadsheetId: '1WOJG9S4P2OGyzFIma_QVSEq7tEp0mc56KSlJfPnN0mg',
      range: 'landing page!A:B', // Adjust the range as per your sheet
    });

    const rows = response.data.values;
    if (rows.length) {
      const formattedRows = rows.map((row) => {
        let posterLink = row[1];
        const driveThumbnailPattern = /^https:\/\/drive\.google\.com\/thumbnail\?id=(.+)$/;
        const match = driveThumbnailPattern.exec(posterLink);

        if (match) {
          const id = match[1];
          posterLink = `https://lh3.googleusercontent.com/d/${id}=s1000?authuser=0`;
        }

        return {
          id: row[0],
          posterLink: posterLink,
        };
      });

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
