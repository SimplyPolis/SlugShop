import { FileWithPath } from 'file-selector';
import { FileSizeRestrictions, UseFilePickerConfig } from '../../interfaces';
import { Validator } from '../validatorBase';
export default class FileSizeValidator extends Validator {
    private fileSizeRestrictions;
    constructor(fileSizeRestrictions: FileSizeRestrictions);
    validateBeforeParsing(_config: UseFilePickerConfig, plainFiles: File[]): Promise<void>;
    validateAfterParsing(_config: UseFilePickerConfig, _file: FileWithPath): Promise<void>;
}
