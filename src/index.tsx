import React, {useState, useRef, useEffect, useContext, forwardRef, useImperativeHandle} from 'react';
import { InputNumber, InputNumberProps, ConfigProvider } from 'antd';
// @ts-ignore
import styled from 'styled-components';

const StyledInputRange = styled.div.attrs({ className: 'xf-input-range' })`
> .${(props:any) => props.prefix}-input-number {
  width: calc(50% - 10px);
}

> .xf-input-range-separator {
  display: inline-block;
  width: 20px;
  text-align: center;
}
`;

export type InputNumberRangeValue = [string|number|null, string|number|null] | null | undefined

export type InputNumberRangeProps = {
  value?: InputNumberRangeValue,
  defaultValue?: InputNumberRangeValue,
  onChange?: (value: InputNumberRangeValue) => void,
  separator?: string|React.ReactNode,
} & Omit<InputNumberProps, 'value'|'defaultValue'|'onChange'>;

export const InputNumberRange  = (props: InputNumberRangeProps, ref: any) => {
  const {
    value,
    defaultValue,
    onChange,
    separator = '-',
    style,
    ...restProps
  } = props;
  const context  = useContext(ConfigProvider.ConfigContext);
  const eleRefStart = useRef<HTMLInputElement>();
  const eleRefEnd = useRef<HTMLInputElement>();
  const rangeValues: [string|number|null, string|number|null] = [null, null];
  const [_value, setValue] = useState<InputNumberRangeValue>('value' in props ? value : defaultValue);

  useImperativeHandle(ref, () => (
    {
      focusStart: () => {
        eleRefStart.current?.focus();
      },
      focusEnd: () => {
        eleRefEnd.current?.focus();
      }
    }
  ))

  const setRangeValue = (index:number, val: string|number|null) => {
    rangeValues[index] = val;
  };

  const setRangeValueByProps = () => {
    if (Array.isArray(_value)) {
      const [s,e] = _value;
      setRangeValue(0, s);
      setRangeValue(1, e);
    } else {
      setRangeValue(0, null);
      setRangeValue(1, null);
    }
  };

  useEffect(() => {
    setValue(value ? value : null);
    setRangeValueByProps();
  }, [value])

  const handleChange = (index:number, val: string|number|null) => {
    setRangeValue(index, val);
    const nextValue: InputNumberRangeValue = rangeValues[0] == null && rangeValues[1] == null
      ? undefined
      : [rangeValues[0], rangeValues[1]];
    setValue(nextValue);
    if (props.onChange) {
      props.onChange(nextValue);
    }
  }

  return (
    <StyledInputRange className="xf-input-range" style={style} prefix={context.getPrefixCls()}>
      <InputNumber
        {...restProps}
        // @ts-ignore
        ref={eleRefStart}
        style={{ width: 'calc(50% - 10px)' }}
        value={(_value && _value[0]) ?? undefined}
        onChange={val => handleChange(0, val)}
      />
      <span className="xf-input-range-separator">{separator}</span>
      <InputNumber
        {...restProps}
        // @ts-ignore
        ref={eleRefEnd}
        style={{ width: 'calc(50% - 10px)' }}
        value={(_value && _value[1]) ?? undefined}
        onChange={val => handleChange(1, val)}
      />
    </StyledInputRange>
  );
}

export default React.memo(forwardRef(InputNumberRange));
