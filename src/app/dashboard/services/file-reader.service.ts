import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileReaderService {

  constructor() { }

  async readBlob(blob: Blob) {
    return await new Response(blob).arrayBuffer();
  }

  async readChunk(chunk): Promise<string> {
    const fileSliceBlobStream = await chunk.stream();
    return await this.streamToText(fileSliceBlobStream);
  }

  // We just use this function to convert streams to text
  streamToText = async (blob) => {
    const readableStream = await blob.getReader();
    let chunk = await readableStream.read();
    let decodedChunk = new TextDecoder('utf-8').decode(chunk.value);
    chunk = null;
    return decodedChunk;
  }

  blobToBuffer(blob: Blob): Promise<string | ArrayBuffer> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader;
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsArrayBuffer(blob);
    });
  }

  /**
  * @param {File|Blob} - file to slice
  * @param {number} - chunksAmount
  * @return {Array} - an array of Blobs
  **/
  sliceFile(file: File, chunksAmount: number): Blob[] {
    var byteIndex = 0;
    var chunks = [];

    for (var i = 0; i < chunksAmount; i += 1) {
      var byteEnd = Math.ceil((file.size / chunksAmount) * (i + 1));
      chunks.push(file.slice(byteIndex, byteEnd));
      byteIndex += (byteEnd - byteIndex);
    }

    return chunks;
  }
}
