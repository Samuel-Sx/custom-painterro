import { setParam } from './params';

export default class ControlBuilder {
  constructor(main) {
    this.main = main;
  }

  buildFontSizeControl(controlIndex) {
    const action = () => {
      const fontSize =
        document.getElementById(this.main.activeTool.controls[controlIndex].id).value;
      this.main.textTool.setFontSize(fontSize);
      setParam('defaultFontSize', fontSize);
    };
    const getValue = () => this.main.textTool.fontSize;

    if (this.main.params.availableFontSizes) {
      return ControlBuilder.buildRangeControl('fontSize', action, getValue, this.main.params.availableFontSizes);
    }
    return ControlBuilder.buildRangeControl('fontSize', action, getValue, [1, 81]);
  }

  buildEraserWidthControl(controlIndex) {
    const action = () => {
      const width = document.getElementById(this.main.activeTool.controls[controlIndex].id).value;
      this.main.primitiveTool.setEraserWidth(width);
      setParam('defaultEraserWidth', width);
    };
    const getValue = () => this.main.primitiveTool.eraserWidth;

    if (this.main.params.availableEraserWidths) {
      return ControlBuilder.buildRangeControl('eraserWidth', action, getValue, this.main.params.availableEraserWidths);
    }
    return ControlBuilder.buildRangeControl('eraserWidth', action, getValue, [1, 15]);
  }

  buildLineWidthControl(controlIndex) {
    const action = () => {
      let width = document.getElementById(this.main.activeTool.controls[controlIndex].id).value;
      width < 1 && (width = 1) // 限制range最小值
      this.main.primitiveTool.setLineWidth(width);
      setParam('defaultLineWidth', width);
    };
    const getValue = () => this.main.primitiveTool.lineWidth;

    if (this.main.params.availableLineWidths) {
      return ControlBuilder.buildRangeControl('lineWidth', action, getValue, this.main.params.availableLineWidths);
    }
    return ControlBuilder.buildInputControl('lineWidth', action, getValue, 1, 99);
  }
  buildArrowLengthControl(controlIndex) {
    const action = () => {
      const width = document.getElementById(this.main.activeTool.controls[controlIndex].id).value;
      this.main.primitiveTool.setArrowLength(width);
      setParam('defaultArrowLength', width);
    };
    const getValue = () => this.main.primitiveTool.arrowLength;

    if (this.main.params.availableArrowLengths) {
      return ControlBuilder.buildRangeControl('arrowLength', action, getValue, this.main.params.availableArrowLengths);
    }
    return ControlBuilder.buildRangeControl('arrowLength', action, getValue, [1, 99]);
  }

  static buildInputControl(name, action, getValue, minVal, maxVal) {
    return {
      type: 'int',
      title: name,
      titleFull: `${name}Full`,
      target: name,
      min: minVal,
      max: maxVal,
      action,
      getValue,
    };
  }

  static buildDropDownControl(name, action, getValue, availableValues) {
    return {
      type: 'dropdown',
      title: name,
      titleFull: `${name}Full`,
      target: name,
      action,
      getValue,
      getAvailableValues: () => availableValues.map(
        x => ({ value: x, name: x.toString(), title: x.toString() })),
    };
  }

  static buildRangeControl(name, action, getValue, availableValues) {
    return {
      type: 'range',
      title: name,
      titleFull: `${name}Full`,
      target: name,
      action,
      getValue,
      min: availableValues[0],
      max: availableValues[availableValues.length - 1],
    };
  }
}

