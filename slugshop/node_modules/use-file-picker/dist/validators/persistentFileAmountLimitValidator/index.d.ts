import { FileAmountLimitConfig, UseFilePickerConfig } from '../../interfaces';
import { Validator } from '../validatorBase';
declare class PersistentFileAmountLimitValidator extends Validator {
    private limitFilesConfig;
    private previousPlainFiles;
    constructor(limitFilesConfig: FileAmountLimitConfig);
    onClear(): void;
    onFileRemoved(_removedFile: File, removedIndex: number): void;
    validateBeforeParsing(_config: UseFilePickerConfig, plainFiles: File[]): Promise<void>;
    validateAfterParsing(): Promise<void>;
}
export default PersistentFileAmountLimitValidator;
