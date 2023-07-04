export function convertCanvasToBinaryFile(canvas:HTMLCanvasElement){
  const formData = new FormData();
  const image = canvas.toDataURL(); // Convert canvas to data URL

  // Extract the base64 image data from the data URL
  const imageData = image.replace(/^data:image\/(png|jpg);base64,/, '');

  // Convert base64 to binary
  const binaryImageData = atob(imageData);

  // Create a new ArrayBuffer and Uint8Array to hold the binary data
  const buffer = new ArrayBuffer(binaryImageData.length);
  const binaryArray = new Uint8Array(buffer);

  // Fill the Uint8Array with the binary data
  for (let i = 0; i < binaryImageData.length; i++) {
    binaryArray[i] = binaryImageData.charCodeAt(i);
  }

  // Do whatever you want with the binary data here

  // Create a Blob from the binary data and add it to the FormData object
  const blob = new Blob([binaryArray], { type: 'image/png' });
  formData.append('file', blob, 'avatar.png');
  return formData
}