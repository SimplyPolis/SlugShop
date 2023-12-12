import { SelectedFilesOrErrors, ExtractContentTypeFromConfig, UseFilePickerConfig, SelectedFiles, FileErrors } from '../interfaces';
export declare const useValidators: <ConfigType extends UseFilePickerConfig<CustomErrors>, CustomErrors>({ onFilesSelected: onFilesSelectedProp, onFilesSuccessfullySelected: onFilesSuccessfullySelectedProp, onFilesRejected: onFilesRejectedProp, onClear: onClearProp, validators, }: ConfigType) => {
    onFilesSelected: (data: SelectedFilesOrErrors<ExtractContentTypeFromConfig<ConfigType>, CustomErrors>) => void;
    onFilesSuccessfullySelected: (data: SelectedFiles<ExtractContentTypeFromConfig<ConfigType>>) => void;
    onFilesRejected: (errors: FileErrors<CustomErrors>) => void;
    onClear: () => void;
};
