import { UseFilePickerConfig, FilePickerReturnTypes, ExtractContentTypeFromConfig } from './interfaces';
declare function useFilePicker<CustomErrors = unknown, ConfigType extends UseFilePickerConfig<CustomErrors> = UseFilePickerConfig<CustomErrors>>(props: ConfigType): FilePickerReturnTypes<ExtractContentTypeFromConfig<ConfigType>, CustomErrors>;
export default useFilePicker;
