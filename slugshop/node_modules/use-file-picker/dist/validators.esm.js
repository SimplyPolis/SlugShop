import { d as _inheritsLoose, _ as _asyncToGenerator, a as _regeneratorRuntime } from './_rollupPluginBabelHelpers-4e04b055.js';

var Validator = /*#__PURE__*/function () {
  function Validator() {
    this.invokerHookId = void 0;
  }
  var _proto = Validator.prototype;
  /**
   * lifecycle method called after user selection (regardless of validation result)
   */
  _proto.onFilesSelected = function onFilesSelected(_data) {}
  /**
   * lifecycle method called after successful validation
   */;
  _proto.onFilesSuccessfullySelected = function onFilesSuccessfullySelected(_data) {}
  /**
   * lifecycle method called after failed validation
   */;
  _proto.onFilesRejected = function onFilesRejected(_data) {}
  /**
   * lifecycle method called after the selection is cleared
   */;
  _proto.onClear = function onClear() {}
  /**
   * This method is called when file is removed from the list of selected files.
   * Invoked only by the useImperativeFilePicker hook
   * @param _removedFile removed file
   * @param _removedIndex index of removed file
   */;
  _proto.onFileRemoved = function onFileRemoved(_removedFile, _removedIndex) {};
  return Validator;
}();

var FileAmountLimitValidator = /*#__PURE__*/function (_Validator) {
  _inheritsLoose(FileAmountLimitValidator, _Validator);
  function FileAmountLimitValidator(limitAmountOfFilesConfig) {
    var _this;
    _this = _Validator.call(this) || this;
    _this.limitAmountOfFilesConfig = void 0;
    _this.limitAmountOfFilesConfig = limitAmountOfFilesConfig;
    return _this;
  }
  var _proto = FileAmountLimitValidator.prototype;
  _proto.validateBeforeParsing = function validateBeforeParsing(_config, plainFiles) {
    var _this$limitAmountOfFi = this.limitAmountOfFilesConfig,
      min = _this$limitAmountOfFi.min,
      max = _this$limitAmountOfFi.max;
    if (max && plainFiles.length > max) {
      return Promise.reject({
        name: 'FileAmountLimitError',
        reason: 'MAX_AMOUNT_OF_FILES_EXCEEDED'
      });
    }
    if (min && plainFiles.length < min) {
      return Promise.reject({
        name: 'FileAmountLimitError',
        reason: 'MIN_AMOUNT_OF_FILES_NOT_REACHED'
      });
    }
    return Promise.resolve();
  };
  _proto.validateAfterParsing = function validateAfterParsing() {
    return Promise.resolve();
  };
  return FileAmountLimitValidator;
}(Validator);

var FileSizeValidator = /*#__PURE__*/function (_Validator) {
  _inheritsLoose(FileSizeValidator, _Validator);
  function FileSizeValidator(fileSizeRestrictions) {
    var _this;
    _this = _Validator.call(this) || this;
    _this.fileSizeRestrictions = void 0;
    _this.fileSizeRestrictions = fileSizeRestrictions;
    return _this;
  }
  var _proto = FileSizeValidator.prototype;
  _proto.validateBeforeParsing = /*#__PURE__*/function () {
    var _validateBeforeParsing = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(_config, plainFiles) {
      var _this$fileSizeRestric, minFileSize, maxFileSize, errors;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _this$fileSizeRestric = this.fileSizeRestrictions, minFileSize = _this$fileSizeRestric.minFileSize, maxFileSize = _this$fileSizeRestric.maxFileSize;
            if (!(!minFileSize && !maxFileSize)) {
              _context.next = 3;
              break;
            }
            return _context.abrupt("return", Promise.resolve());
          case 3:
            errors = plainFiles.map(function (file) {
              return getFileSizeError({
                minFileSize: minFileSize,
                maxFileSize: maxFileSize,
                file: file
              });
            }).filter(function (error) {
              return !!error;
            });
            return _context.abrupt("return", errors.length > 0 ? Promise.reject(errors) : Promise.resolve());
          case 5:
          case "end":
            return _context.stop();
        }
      }, _callee, this);
    }));
    function validateBeforeParsing(_x, _x2) {
      return _validateBeforeParsing.apply(this, arguments);
    }
    return validateBeforeParsing;
  }();
  _proto.validateAfterParsing = /*#__PURE__*/function () {
    var _validateAfterParsing = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(_config, _file) {
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", Promise.resolve());
          case 1:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    function validateAfterParsing(_x3, _x4) {
      return _validateAfterParsing.apply(this, arguments);
    }
    return validateAfterParsing;
  }();
  return FileSizeValidator;
}(Validator);
var getFileSizeError = function getFileSizeError(_ref) {
  var file = _ref.file,
    maxFileSize = _ref.maxFileSize,
    minFileSize = _ref.minFileSize;
  if (minFileSize) {
    var minBytes = minFileSize;
    if (file.size < minBytes) {
      return {
        name: 'FileSizeError',
        reason: 'FILE_SIZE_TOO_SMALL',
        causedByFile: file
      };
    }
  }
  if (maxFileSize) {
    var maxBytes = maxFileSize;
    if (file.size > maxBytes) {
      return {
        name: 'FileSizeError',
        reason: 'FILE_SIZE_TOO_LARGE',
        causedByFile: file
      };
    }
  }
};

var ImageDimensionsValidator = /*#__PURE__*/function (_Validator) {
  _inheritsLoose(ImageDimensionsValidator, _Validator);
  function ImageDimensionsValidator(imageSizeRestrictions) {
    var _this;
    _this = _Validator.call(this) || this;
    _this.imageSizeRestrictions = void 0;
    _this.imageSizeRestrictions = imageSizeRestrictions;
    return _this;
  }
  var _proto = ImageDimensionsValidator.prototype;
  _proto.validateBeforeParsing = function validateBeforeParsing() {
    return Promise.resolve();
  };
  _proto.validateAfterParsing = function validateAfterParsing(config, file, reader) {
    var readAs = config.readAs;
    if (readAs === 'DataURL' && this.imageSizeRestrictions && isImage(file.type)) {
      return checkImageDimensions(file, reader.result, this.imageSizeRestrictions);
    }
    return Promise.resolve();
  };
  return ImageDimensionsValidator;
}(Validator);
var isImage = function isImage(fileType) {
  return fileType.startsWith('image');
};
var checkImageDimensions = function checkImageDimensions(file, imgDataURL, imageSizeRestrictions) {
  return new Promise(function (resolve, reject) {
    var img = new Image();
    var error = {
      name: 'ImageDimensionError',
      causedByFile: file,
      reasons: []
    };
    img.onload = function () {
      var maxHeight = imageSizeRestrictions.maxHeight,
        maxWidth = imageSizeRestrictions.maxWidth,
        minHeight = imageSizeRestrictions.minHeight,
        minWidth = imageSizeRestrictions.minWidth;
      var width = this.width,
        height = this.height;
      if (maxHeight && maxHeight < height) error.reasons.push('IMAGE_HEIGHT_TOO_BIG');
      if (minHeight && minHeight > height) error.reasons.push('IMAGE_HEIGHT_TOO_SMALL');
      if (maxWidth && maxWidth < width) error.reasons.push('IMAGE_WIDTH_TOO_BIG');
      if (minWidth && minWidth > width) error.reasons.push('IMAGE_WIDTH_TOO_SMALL');
      error.reasons.length ? reject(error) : resolve();
    };
    img.onerror = function () {
      error.reasons.push('IMAGE_NOT_LOADED');
      reject(error);
    };
    img.src = imgDataURL;
  });
};

var PersistentFileAmountLimitValidator = /*#__PURE__*/function (_Validator) {
  _inheritsLoose(PersistentFileAmountLimitValidator, _Validator);
  function PersistentFileAmountLimitValidator(limitFilesConfig) {
    var _this;
    _this = _Validator.call(this) || this;
    _this.limitFilesConfig = void 0;
    _this.previousPlainFiles = [];
    _this.limitFilesConfig = limitFilesConfig;
    return _this;
  }
  var _proto = PersistentFileAmountLimitValidator.prototype;
  _proto.onClear = function onClear() {
    this.previousPlainFiles = [];
  };
  _proto.onFileRemoved = function onFileRemoved(_removedFile, removedIndex) {
    this.previousPlainFiles.splice(removedIndex, 1);
  };
  _proto.validateBeforeParsing = function validateBeforeParsing(_config, plainFiles) {
    var fileAmount = this.previousPlainFiles.length + plainFiles.length;
    var _this$limitFilesConfi = this.limitFilesConfig,
      min = _this$limitFilesConfi.min,
      max = _this$limitFilesConfi.max;
    if (max && fileAmount > max) {
      return Promise.reject({
        name: 'FileAmountLimitError',
        reason: 'MAX_AMOUNT_OF_FILES_EXCEEDED'
      });
    }
    if (min && fileAmount < min) {
      return Promise.reject({
        name: 'FileAmountLimitError',
        reason: 'MIN_AMOUNT_OF_FILES_NOT_REACHED'
      });
    }
    this.previousPlainFiles = [].concat(this.previousPlainFiles, plainFiles);
    return Promise.resolve();
  };
  _proto.validateAfterParsing = function validateAfterParsing() {
    return Promise.resolve();
  };
  return PersistentFileAmountLimitValidator;
}(Validator);

var FileTypeValidator = /*#__PURE__*/function (_Validator) {
  _inheritsLoose(FileTypeValidator, _Validator);
  function FileTypeValidator(acceptedFileExtensions) {
    var _this;
    _this = _Validator.call(this) || this;
    _this.acceptedFileExtensions = void 0;
    _this.acceptedFileExtensions = acceptedFileExtensions;
    return _this;
  }
  var _proto = FileTypeValidator.prototype;
  _proto.validateBeforeParsing = function validateBeforeParsing(_config, plainFiles) {
    var _this2 = this;
    var fileExtensionErrors = plainFiles.reduce(function (errors, currentFile) {
      var fileExtension = currentFile.name.split('.').pop();
      if (!fileExtension) {
        return [].concat(errors, [{
          name: 'FileTypeError',
          reason: 'FILE_EXTENSION_NOT_FOUND',
          causedByFile: currentFile
        }]);
      }
      if (!_this2.acceptedFileExtensions.includes(fileExtension)) {
        return [].concat(errors, [{
          name: 'FileTypeError',
          reason: 'FILE_TYPE_NOT_ACCEPTED',
          causedByFile: currentFile
        }]);
      }
      return errors;
    }, []);
    return fileExtensionErrors.length > 0 ? Promise.reject(fileExtensionErrors) : Promise.resolve();
  };
  _proto.validateAfterParsing = function validateAfterParsing(_config, _file, _reader) {
    return Promise.resolve();
  };
  return FileTypeValidator;
}(Validator);

export { FileAmountLimitValidator, FileSizeValidator, FileTypeValidator, ImageDimensionsValidator, PersistentFileAmountLimitValidator, Validator };
//# sourceMappingURL=validators.esm.js.map
