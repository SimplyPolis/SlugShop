import { FileWithPath, UseFilePickerConfig } from '../../interfaces';
import { Validator } from '../validatorBase';
export default class FileTypeValidator extends Validator {
    private readonly acceptedFileExtensions;
    constructor(acceptedFileExtensions: string[]);
    validateBeforeParsing(_config: UseFilePickerConfig<any>, plainFiles: File[]): Promise<void>;
    validateAfterParsing(_config: UseFilePickerConfig<any>, _file: FileWithPath, _reader: FileReader): Promise<void>;
}
