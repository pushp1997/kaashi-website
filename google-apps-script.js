// KAASHI Order Form - Google Apps Script
// 
// SETUP INSTRUCTIONS:
// 1. Create a new Google Sheet called "KAASHI Orders"
// 2. Add these column headers in row 1:
//    Timestamp | Name | Phone | Address | Day | Time | Payment | Notes | Items | Total | Status
// 3. Go to Extensions > Apps Script
// 4. Paste this entire code
// 5. Click Deploy > New Deployment > Web App
// 6. Set "Execute as" to "Me" and "Who has access" to "Anyone"
// 7. Copy the Web App URL and update it in the website's GOOGLE_SCRIPT_URL variable

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    // Append row with order data
    sheet.appendRow([
      new Date().toLocaleString('en-IE', { timeZone: 'Europe/Dublin' }),
      data.name,
      data.phone,
      data.address,
      data.day,
      data.time,
      data.payment,
      data.notes,
      data.items,
      data.total,
      '⏳ Pending'
    ]);
    
    // Send WhatsApp notification via webhook (optional)
    // You can set up a webhook to notify you of new orders
    
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput('KAASHI Order API is running')
    .setMimeType(ContentService.MimeType.TEXT);
}
