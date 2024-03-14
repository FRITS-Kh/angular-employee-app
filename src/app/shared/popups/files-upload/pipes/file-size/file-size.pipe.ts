import { Pipe, PipeTransform } from '@angular/core';

const FILE_SIZE_UNITS = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
const FILE_SIZE_UNITS_LONG = [
  'Bytes',
  'Kilobytes',
  'Megabytes',
  'Gigabytes',
  'Pettabytes',
  'Exabytes',
  'Zettabytes',
  'Yottabytes',
];
const FILE_SIZE_KB = 1024;

@Pipe({
  name: 'fileSize',
})
export class FileSizePipe implements PipeTransform {
  transform(sizeInBytes: number, longForm = false): string {
    const units = longForm ? FILE_SIZE_UNITS_LONG : FILE_SIZE_UNITS;
    let power = 0;
    let size = sizeInBytes;

    while (size >= FILE_SIZE_KB) {
      size /= FILE_SIZE_KB;
      power++;
    }

    const formattedSize = Math.round(size * 100) / 100;
    const unit = units[power];

    return `${formattedSize} ${unit}`;
  }
}
