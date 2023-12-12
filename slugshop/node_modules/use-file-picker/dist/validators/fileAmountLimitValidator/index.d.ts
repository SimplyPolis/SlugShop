import { FileAmountLimitConfig, UseFilePickerConfig } from '../../interfaces';
import { Validator } from '../validatorBase';
export default class FileAmountLimitValidator extends Validator {
    private limitAmountOfFilesConfig;
    constructor(limitAmountOfFilesConfig: FileAmountLimitConfig);
    validateBeforeParsing(_config: UseFilePickerConfig, plainFiles: File[]): Promise<void>;
    validateAfterParsing(): Promise<void>;
}
