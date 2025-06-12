import React, {
  DetailedHTMLProps,
  InputHTMLAttributes,
  ReactNode,
  useState,
} from "react";
import SuperInputText from "../../../hw04/common/c1-SuperInputText/SuperInputText";

// тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

// здесь мы говорим что у нашего инпута будут такие же пропсы как у обычного инпута, кроме type
// (чтоб не писать value: string, onChange: ...; они уже все описаны в DefaultInputPropsType)
export type SuperDebouncedInputPropsType = Omit<
  DefaultInputPropsType,
  "type"
> & {
  // и + ещё пропсы которых нет в стандартном инпуте
  onChangeText?: (value: string) => void;
  onEnter?: () => void;
  error?: ReactNode;
  spanClassName?: string;
} & {
  // илм экспортировать тип SuperInputTextPropsType
  // плюс специальный пропс SuperPagination
  onDebouncedChange?: (value: string) => void;
};

const SuperDebouncedInput: React.FC<SuperDebouncedInputPropsType> = ({
  onChangeText,
  onDebouncedChange,

  ...restProps // все остальные пропсы попадут в объект restProps
}) => {
  const [timerId, setTimerId] = useState<number | undefined | NodeJS.Timeout>(
    undefined
  );

  const customTimeOut = (milSec: number, value: string) => {
    if (onDebouncedChange) {
      const timerId = setTimeout(() => {
        onDebouncedChange(value);
      }, milSec);
      setTimerId(timerId);
    }
  };

  const onChangeTextCallback = (value: string) => {
    onChangeText?.(value);

    if (onDebouncedChange) {
      if (timerId) {
        clearTimeout(timerId);
        setTimerId(undefined);
        customTimeOut(1500, value);
      } else {
        customTimeOut(1500, value);
      }
    }
  };

  return <SuperInputText onChangeText={onChangeTextCallback} {...restProps} />;
};

export default SuperDebouncedInput;
