import { ExtractContentTypeFromConfig, ImperativeFilePickerReturnTypes, useImperativeFilePickerConfig } from './interfaces';
/**
 * A version of useFilePicker hook that keeps selected files between selections. On top of that it allows to remove files from the selection.
 */
declare function useImperativeFilePicker<CustomErrors = unknown, ConfigType extends useImperativeFilePickerConfig<CustomErrors> = useImperativeFilePickerConfig<CustomErrors>>(props: ConfigType): ImperativeFilePickerReturnTypes<ExtractContentTypeFromConfig<ConfigType>, CustomErrors>;
export default useImperativeFilePicker;
