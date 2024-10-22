import { FilesUploadDirective } from './files-upload.directive';
import { MatDialog } from '@angular/material/dialog';

describe('FilesUploadDirective', () => {
  let matDialogMock: jest.Mocked<MatDialog>;

  beforeEach(() => {
    matDialogMock = {
      open: jest.fn(),
    } as unknown as jest.Mocked<MatDialog>;
  });

  it('should create an instance', () => {
    const directive = new FilesUploadDirective(matDialogMock);
    expect(directive).toBeTruthy();
  });
});
