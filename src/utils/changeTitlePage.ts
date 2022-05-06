export function changeTitlePage(title: string) {
  document.title = title;
}

export function getBase64(file: File, cb: any) {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    cb(reader.result);
  };
  reader.onerror = function (error) {
    console.log('Error: ', error);
  };
}
