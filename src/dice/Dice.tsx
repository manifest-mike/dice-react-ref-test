import styled from "styled-components";
import {forwardRef, Ref, useImperativeHandle, useState} from "react";

const StyledDice = styled.div`
  border: 1px solid green;
  height: 30px;
  width: 30px;
  text-align: center;
  line-height: 30px;
  font-size: 20px;
  font-weight: 500;
`

type DiceProps = {};

export type DiceRef = {
    roll(): number;
}

const Dice = forwardRef((props: DiceProps, ref: Ref<DiceRef>) => {
    useImperativeHandle(ref, () => ({ roll }))
    const [value, setValue] = useState(0);

    function roll() {
        const newValue = Math.floor(Math.random() * 6) + 1;
        setValue(newValue);
        return newValue;
    }

    return <StyledDice>{value}</StyledDice>
})

export default Dice;
