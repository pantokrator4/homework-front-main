import React from "react";
import { Slider, SliderProps } from "@mui/material";

const SuperRange: React.FC<SliderProps> = (props) => {
  return (
    <Slider
      sx={
        {
          // стили для слайдера // пишет студент
					width: 300, 
					color:'hsla(130, 100%, 40%, 1)',
        }
      }
			
      {...props} // отдаём слайдеру пропсы если они есть (value например там внутри)
    />
  );
};

export default SuperRange;
