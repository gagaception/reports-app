export const isEmptyObject = obj => Object.keys(obj).length === 0;

export const validateForm = report => {
  const errors = {};
  const allowedExtensions = /(\.jpg|\.pdf|\.txt|\.tiff\.JPG|\.PDF|\.TXT|\.TIFF)$/i;
  
  if (report.title.length < 3 || report.title.length > 10) {
    errors.title = 'Title length should be from 3 to 10 symbols';
  }
  if (report.file) {
    if (!allowedExtensions.exec(report.file.name)) {
      errors.file = "File could be only in PDF, PNG, TXT, TIFF format";
    }
  }

  return errors;
}