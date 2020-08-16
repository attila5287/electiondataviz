function init(year) {
  importPrezCSV(year);
  importWinnerCSV( year );
  importTicketsCSV();
}

init(2016);
