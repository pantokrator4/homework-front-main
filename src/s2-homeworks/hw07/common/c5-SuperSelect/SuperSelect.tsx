import React, {
  SelectHTMLAttributes,
  DetailedHTMLProps,
  ChangeEvent,
} from "react";
import s from "./SuperSelect.module.css";
import { useSelector } from "react-redux";
import { changeThemeId } from "../../../hw12/bll/themeReducer";
import { AppStoreType } from "../../../hw10/bll/store";

type DefaultSelectPropsType = DetailedHTMLProps<
  SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>;

type SuperSelectPropsType = DefaultSelectPropsType & {
  options?: any[];
  onChangeOption?: (option: number) => void;
};

const SuperSelect: React.FC<SuperSelectPropsType> = ({
  options,
  className,
  onChange,
  onChangeOption,
  ...restProps
}) => {
  const themeId = useSelector((state: AppStoreType) => state.theme.themeId);

  const mappedOptions: any[] = options
    ? options.map((o) => (
        <option
          id={"hw7-option-" + o.id}
          className={s.option}
          key={o.id}
          value={o.id}
        >
          {o.value}
        </option>
      ))
    : []; // map options with key

  const onChangeCallback = (e: ChangeEvent<HTMLSelectElement>) => {
		onChangeOption?.(Number(e.currentTarget.value))
    onChange?.(e)
		}

  const finalSelectClassName = s.select + (className ? " " + className : "");

  return (
    <select
      value={themeId}
      className={finalSelectClassName}
      onChange={onChangeCallback}
      {...restProps}
    >
      { mappedOptions }
    </select>
  );
};

export default SuperSelect;
