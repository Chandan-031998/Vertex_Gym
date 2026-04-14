import * as XLSX from 'xlsx';

export const exportExcel = (rows = [], filename = 'report') => {
  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Report');
  XLSX.writeFile(workbook, `${filename.replace(/\s+/g, '-').toLowerCase()}.xlsx`);
};
