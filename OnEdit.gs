function onEdit(e)
{
  Logger.log("maintentence period")
  return;
  
  let name = e.range.getSheet().getSheetName();
  Logger.log(e.value)
  
  if (name == "1 - MyLibrary")
    onMyLibEdit(e);
  
}

function onMyLibEdit(e)
{
  Logger.log("taking route: onMyLibEdit(e)")
  let row = e.range.getRow();
  let col = e.range.getColumn();
  
  if (row == 3)
  {
    Logger.log("if (row == 3)")
    if (col == 2) // show blacklist
    {
      let range = SHEETS[1].getRange("B6:B").getValues();
      if (e.value == "TRUE")
      {
        for (let i = 0; i < range.length; i++)
        {
          if (range[i][0] == true)
            SHEETS[1].showRows(i+6);
        }
      }
      else
      {
        for (let i = 0; i < range.length; i++)
        {
          if (range[i][0] == true)
            SHEETS[1].hideRows(i+6);
        }
      }
    }
    
    else if (col == 3)
    {
      if (e.value == "TRUE")
      {
        SHEETS[1].showColumns(1,22)
      }
      else
      {
        SHEETS[1].hideColumns(6,3)
        SHEETS[1].hideColumns(13,2)
        SHEETS[1].hideColumns(16,6)
      }
    }
    
    return;
  }
  
  if(row>=6)
  {
    Logger.log("if (row >= 6)")
    
    let rtf = -1;
    switch(col)
    {
      case 2:
        OverviewAdjust()
        if (SHEETS[1].getRange("B3").getValue() == false)
        {
          if(e.value == "TRUE")
          {
            SHEETS[1].hideRows(row)
          }
        }
        rtf = 10;
        break;
      case 9:
        rtf = 8
        break;
      case 10:
        rtf = 5
        break;
      case 11:
        rtf =6
        break;
      case 12:
        rtf = 7;
        break;
      case 22:
        rtf = 9;
        break;
      default:
        break;
    }
    
    let refid = SHEETS[1].getRange(row, 4).getValue()
    Logger.log("doing cleanup, update id = ", refid + '')
    
    let backupsheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("1.5 - PlayerInput Backup")
    let backuparray = backupsheet.getRange("C6:C").getValues()
    Logger.log(backuparray[0][0])
    for (let i = 0; i < backuparray.length; i++)
    {
      if (backuparray[i][0]+ '' == refid+'')
      {
        Logger.log("found match")
        // if id exists on backuparray, we use said value to override the variables
        backupsheet.getRange(i+6, rtf).setValue(e.value)
        break;
      }
    }
    
    return;
  }
}