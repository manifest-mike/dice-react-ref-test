import {forwardRef, ReactElement, Ref, useImperativeHandle, useRef, useState} from "react";
import Dice, {DiceRef} from "./Dice";
import styled from "styled-components";

const StyledDiceGroup = styled.div`
  .diceGroup {
    margin: auto;
    display: inline-flex;
    * {
      margin-right: 15px;
    }
    *:last-child {
      margin-right: 0;
    }
  }

`

type DiceGroupProps = {
    total: number;
}

export type DiceGroupRef = {
    rollAllDice(): number[];
}

const DiceGroup = forwardRef((props: DiceGroupProps, ref: Ref<DiceGroupRef>) => {
    const { total } = props;
    const diceRefs = useRef<DiceRef[]>([]);
    const [diceValues, setDiceValues] = useState<number[]>([]);

    useImperativeHandle(ref, () => ({ rollAllDice }))

    function rollAllDice() {
        const values = diceRefs.current.map(diceRef => diceRef.roll());
        setDiceValues(values);
        return values;
    }

    const diceDisplay = () => {
        const dice: ReactElement<typeof Dice>[] = [];
        const newDiceRefs: DiceRef[] = [];
        for (let i = 0; i < total; i++) {
            dice.push(<Dice key={i} ref={(ref => newDiceRefs.push(ref!))} />);
        }
        diceRefs.current = newDiceRefs;
        return dice;
    }

    return (
        <StyledDiceGroup>
            {!!diceValues.length && (
                <pre>We just rolled: {diceValues.join(",")}</pre>
            )}
            <div className="diceGroup">
                {diceDisplay()}
            </div>
        </StyledDiceGroup>
    )
})

export default DiceGroup
