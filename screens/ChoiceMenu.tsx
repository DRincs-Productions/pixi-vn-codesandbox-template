import { Grid } from "@mui/system";
import useNarrationFunctions from "../hooks/useNarrationFunctions";
import { useQueryChoiceMenuOptions } from "../hooks/useQueryInterface";

export default function ChoiceMenu() {
  const { data: menu = [] } = useQueryChoiceMenuOptions();
  const { selectChoice } = useNarrationFunctions();

  return (
    <Grid
      container
      direction='column'
      justifyContent='center'
      alignItems='center'
      spacing={2}
      sx={{
        width: "100%",
        height: "100%",
        overflow: "auto",
        gap: 1,
        maxHeight: "100%",
      }}
    >
      {menu?.map((item, index) => {
        return (
          <Grid key={"choice-" + index} justifyContent='center' alignItems='center'>
            <button style={{ pointerEvents: "auto" }} onClick={() => selectChoice(item)}>
              {item.text}
            </button>
          </Grid>
        );
      })}
    </Grid>
  );
}
