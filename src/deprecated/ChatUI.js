import React from "react";
import {
  Button,
  CssBaseline,
  ThemeProvider,
  createMuiTheme,
  makeStyles,
  TextField,
} from "@material-ui/core";
import {
  ActionRequest,
  AudioActionResponse,
  ChatController,
  FileActionResponse,
  MuiChat,
} from "chat-ui-react";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#007aff",
    },
  },
});

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: "gray",
  },
  container: {
    minHeight: "100vh",
    height: "100vh",
    maxWidth: "640px",
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

export default function ChatUI(props) {
  // stuff for chat
  const classes = useStyles();
  const [chatCtl] = React.useState(new ChatController());
  ///////////////////////////////////////////////////

  React.useMemo(
    async (chatContent, chatSelf) => {
      // Chat content is displayed using ChatController
      await chatCtl.addMessage({
        type: "text",
        content: chatContent,
        self: false,
      });
      const name = await chatCtl.setActionRequest({ type: "text" });
    },
    [chatCtl]
  );

  // Only one component used for display
  //   return <MuiChat chatController={chatCtl} />;

  /////////////////////////////////////////////////

  return (
    <div>
      {props.messageObject[2]
        ? props.messageObject[2].map((msg) => msg.message_body)
        : null}
      <MuiChat chatController={chatCtl} />
    </div>
  );
}
