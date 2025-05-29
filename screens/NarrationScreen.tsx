import { Box, Grid, Stack } from "@mui/system";
import { useQueryCanGoBack, useQueryCanGoNext, useQueryDialogue } from "../hooks/useQueryInterface";
import ChoiceMenu from "./ChoiceMenu";

export default function NarrationScreen() {
  const { data: { text, character } = {} } = useQueryDialogue();
  const { data: canGoNext = false } = useQueryCanGoNext();
  const { data: canGoBack = false } = useQueryCanGoBack();

  return (
    <div
      style={{
        position: "absolute",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
      }}
    >
      <div style={{ flex: 1, minHeight: 0 }}>
        {/* READ THIS: https://pixi-vn.web.app/start/choices.html#how-to-create-the-choice-menu-ui-screen */}
        <ChoiceMenu />
      </div>
      {text && (
        <Box
          sx={{
            flex: "0 0 auto",
            height: `30%`,
            minHeight: 0,
            pointerEvents: "auto",
            backgroundColor: "white",
          }}
        >
          <Stack
            direction='column'
            spacing={0}
            sx={{
              justifyContent: "flex-end",
              alignItems: "flex-start",
              height: "100%",
              width: "100%",
            }}
          >
            {character && character.name && (
              <div
                style={{
                  marginLeft: "10px",
                }}
              >
                {character.name + (character.surname ? " " + character.surname : "")}
              </div>
            )}
            <Grid
              container
              direction={"row"}
              sx={{
                overflow: "auto",
                marginRight: canGoNext || canGoBack ? "40px" : undefined,
                height: "100%",
              }}
            >
              {character?.icon && (
                <Grid size={2}>
                  <img
                    src={character?.icon}
                    loading='lazy'
                    alt=''
                    style={{
                      maxHeight: "100%",
                      maxWidth: "100%",
                    }}
                  />
                </Grid>
              )}
              <Grid size={character?.icon ? 10 : 12}>
                <Box>{text}</Box>
              </Grid>
            </Grid>
          </Stack>
        </Box>
      )}
    </div>
  );
}
