import { FileWithPath } from 'file-selector';
import { ImageDimensionRestrictionsConfig, UseFilePickerConfig } from '../../interfaces';
import { Validator } from '../validatorBase';
export default class ImageDimensionsValidator extends Validator {
    private imageSizeRestrictions;
    constructor(imageSizeRestrictions: ImageDimensionRestrictionsConfig);
    validateBeforeParsing(): Promise<void>;
    validateAfterParsing(config: UseFilePickerConfig, file: FileWithPath, reader: FileReader): Promise<void>;
}
