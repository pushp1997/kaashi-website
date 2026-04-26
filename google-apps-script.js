// KAASHI - Google Apps Script (Orders + Feedback)
// 
// SETUP: 
// 1. Create TWO sheets in your Google Spreadsheet: "Orders" and "Feedback"
// 2. Go to Extensions > Apps Script
// 3. Paste this code and Deploy > New Deployment

function doPost(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const data = JSON.parse(e.postData.contents);
    
    // Detect if this is feedback or order based on fields
    if (data.rating !== undefined) {
      // FEEDBACK submission
      let sheet = ss.getSheetByName('Feedback');
      if (!sheet) {
        sheet = ss.insertSheet('Feedback');
        sheet.appendRow(['Timestamp', 'Rating', 'Items Ordered', 'Taste', 'Portion', 'Would Recommend', 'Improvements', 'Loved', 'New Dishes']);
      }
      
      sheet.appendRow([
        new Date().toLocaleString('en-IE', { timeZone: 'Europe/Dublin' }),
        data.rating + ' ⭐',
        data.ordered || '-',
        data.taste || '-',
        data.portion || '-',
        data.recommend || '-',
        data.improvements || '-',
        data.loved || '-',
        data.new_dishes || '-'
      ]);
    } else {
      // ORDER submission
      let sheet = ss.getSheetByName('Orders');
      if (!sheet) {
        sheet = ss.insertSheet('Orders');
        sheet.appendRow(['Timestamp', 'Name', 'Phone', 'Address', 'Day', 'Time', 'Payment', 'Notes', 'Items', 'Total', 'Status']);
      }
      
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
    }
    
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
    .createTextOutput('KAASHI API is running')
    .setMimeType(ContentService.MimeType.TEXT);
}
